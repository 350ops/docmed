"use client";

import { Appointment, Doctor, DayAvailability } from "@/types";
import { MOCK_DOCTORS } from "./constants";

const DB_KEY = "caresalud_doctor_db_v1";
const DEFAULT_JOURNALS = ["The Lancet", "NEJM", "JAMA", "BMJ"];

export interface DoctorRecord {
  profile: Doctor;
  availability: DayAvailability[];
  appointments: Appointment[];
  journals: string[];
  videoRoom: string;
}

const ensureStorage = () => typeof window !== "undefined";

const baseVideoRoom = (doctorId: string) =>
  `https://meet.jit.si/caresalud-${doctorId}`;

const cloneAvailability = (availability: DayAvailability[]) =>
  availability.map((day) => ({
    date: day.date,
    slots: [...day.slots].sort(),
  }));

function seedAppointments(doctor: Doctor): Appointment[] {
  const patientNames = [
    "María García",
    "Carlos López",
    "Ana Fernández",
    "Pedro Martínez",
    "Lucía Gómez",
  ];
  const appointments: Appointment[] = [];
  doctor.availability.slice(0, 3).forEach((day, idx) => {
    if (day.slots.length === 0) return;
    const time = day.slots[0];
    appointments.push({
      id: `${doctor.id}-${idx}`,
      doctorId: doctor.id,
      patientName: patientNames[idx % patientNames.length],
      dateTime: `${day.date}T${time}:00`,
      status: "confirmed",
      mode: idx % 2 === 0 ? "online" : "in_person",
      reason: "Consulta programada",
      location: doctor.address,
      videoLink: baseVideoRoom(doctor.id),
    });
  });
  return appointments;
}

function seedRecords(): DoctorRecord[] {
  return MOCK_DOCTORS.map((doctor) => ({
    profile: doctor,
    availability: cloneAvailability(doctor.availability),
    appointments: seedAppointments(doctor),
    journals: DEFAULT_JOURNALS.slice(0, 2),
    videoRoom: baseVideoRoom(doctor.id),
  }));
}

function loadRecords(): DoctorRecord[] {
  if (!ensureStorage()) return seedRecords();
  const stored = localStorage.getItem(DB_KEY);
  if (!stored) {
    const seeded = seedRecords();
    localStorage.setItem(DB_KEY, JSON.stringify(seeded));
    return seeded;
  }
  try {
    const parsed = JSON.parse(stored) as DoctorRecord[];
    return parsed;
  } catch {
    const seeded = seedRecords();
    localStorage.setItem(DB_KEY, JSON.stringify(seeded));
    return seeded;
  }
}

function saveRecords(records: DoctorRecord[]) {
  if (!ensureStorage()) return;
  localStorage.setItem(DB_KEY, JSON.stringify(records));
}

function upsertRecord(updated: DoctorRecord): DoctorRecord {
  const records = loadRecords();
  const idx = records.findIndex((r) => r.profile.id === updated.profile.id);
  if (idx >= 0) {
    records[idx] = updated;
  } else {
    records.push(updated);
  }
  saveRecords(records);
  return updated;
}

export function ensureDoctorRecord(doctor: Doctor): DoctorRecord {
  const records = loadRecords();
  const existing = records.find((r) => r.profile.id === doctor.id);
  if (existing) return existing;
  const record: DoctorRecord = {
    profile: doctor,
    availability: cloneAvailability(doctor.availability),
    appointments: seedAppointments(doctor),
    journals: DEFAULT_JOURNALS.slice(0, 2),
    videoRoom: baseVideoRoom(doctor.id),
  };
  return upsertRecord(record);
}

export function getDoctorRecord(doctorId: string): DoctorRecord | null {
  const records = loadRecords();
  return records.find((r) => r.profile.id === doctorId) || null;
}

export function getDoctorProfiles(): Doctor[] {
  return loadRecords().map((r) => ({
    ...r.profile,
    availability: cloneAvailability(r.availability),
  }));
}

export function updateDoctorProfile(profile: Doctor): DoctorRecord {
  const existing = getDoctorRecord(profile.id) || ensureDoctorRecord(profile);
  const mergedProfile: Doctor = {
    ...profile,
    availability: cloneAvailability(profile.availability || existing.availability),
  };
  const updated = { ...existing, profile: mergedProfile };
  return upsertRecord(updated);
}

export function getAvailability(doctorId: string): DayAvailability[] {
  return getDoctorRecord(doctorId)?.availability || [];
}

export function setAvailability(
  doctorId: string,
  availability: DayAvailability[]
): DoctorRecord | null {
  const record = getDoctorRecord(doctorId);
  if (!record) return null;
  record.availability = cloneAvailability(availability);
  record.profile = { ...record.profile, availability: record.availability };
  return upsertRecord(record);
}

export function addAvailabilitySlot(
  doctorId: string,
  date: string,
  time: string
): DoctorRecord | null {
  const record = getDoctorRecord(doctorId);
  if (!record) return null;

  const availability = cloneAvailability(record.availability);
  const dayIndex = availability.findIndex((d) => d.date === date);
  if (dayIndex >= 0) {
    if (!availability[dayIndex].slots.includes(time)) {
      availability[dayIndex].slots.push(time);
      availability[dayIndex].slots.sort();
    }
  } else {
    availability.push({ date, slots: [time] });
  }

  record.availability = availability;
  record.profile = { ...record.profile, availability };
  return upsertRecord(record);
}

export function getAppointments(doctorId: string): Appointment[] {
  return getDoctorRecord(doctorId)?.appointments || [];
}

export function getAllAppointmentsForPatient(patientId: string): (Appointment & { doctorName: string; doctorSpecialty: string; doctorImage: string })[] {
  const records = loadRecords();
  const patientAppointments: (Appointment & { doctorName: string; doctorSpecialty: string; doctorImage: string })[] = [];

  records.forEach(record => {
    record.appointments.forEach(apt => {
      if (apt.patientId === patientId) {
        patientAppointments.push({
          ...apt,
          doctorName: record.profile.name,
          doctorSpecialty: record.profile.specialty,
          doctorImage: record.profile.image
        });
      }
    });
  });

  return patientAppointments.sort(
    (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
  );
}

export function cancelAppointment(doctorId: string, appointmentId: string): DoctorRecord | null {
  return updateAppointmentStatus(doctorId, appointmentId, 'cancelled');
}

export function addAppointment(
  doctorId: string,
  appointment: Appointment
): DoctorRecord | null {
  const record = getDoctorRecord(doctorId);
  if (!record) return null;
  const appointments = [...record.appointments];
  appointments.push({
    ...appointment,
    videoLink: appointment.videoLink || baseVideoRoom(doctorId),
  });
  record.appointments = appointments.sort(
    (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
  );
  return upsertRecord(record);
}

export function updateAppointmentStatus(
  doctorId: string,
  appointmentId: string,
  status: Appointment["status"]
): DoctorRecord | null {
  const record = getDoctorRecord(doctorId);
  if (!record) return null;
  record.appointments = record.appointments.map((appt) =>
    appt.id === appointmentId ? { ...appt, status } : appt
  );
  return upsertRecord(record);
}

export function setJournalPreferences(
  doctorId: string,
  journals: string[]
): DoctorRecord | null {
  const record = getDoctorRecord(doctorId);
  if (!record) return null;
  record.journals = journals;
  return upsertRecord(record);
}

export function getJournalPreferences(doctorId: string): string[] {
  return getDoctorRecord(doctorId)?.journals || DEFAULT_JOURNALS;
}

export function getVideoRoom(doctorId: string): string {
  const record = getDoctorRecord(doctorId);
  if (!record) return baseVideoRoom(doctorId);
  if (!record.videoRoom) {
    record.videoRoom = baseVideoRoom(doctorId);
    upsertRecord(record);
  }
  return record.videoRoom;
}
