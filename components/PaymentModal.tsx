"use client";

import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, ShieldCheck, Loader2 } from 'lucide-react';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    amount: string;
    doctorName: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess, amount, doctorName }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate payment gateway
        setTimeout(() => {
            setIsLoading(false);
            onSuccess();
        }, 1500);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Pago de la consulta</DialogTitle>
                    <DialogDescription>
                        Estás reservando una cita con {doctorName}. El importe se cargará de forma segura.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handlePayment} className="space-y-6 py-4">
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 font-medium">Total a pagar:</span>
                            <span className="text-2xl font-bold text-gray-900">{amount}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="card-name">Nombre en la tarjeta</Label>
                            <Input id="card-name" placeholder="Juan García" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="card-number">Número de tarjeta</Label>
                            <div className="relative">
                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input id="card-number" placeholder="4242 4242 4242 4242" className="pl-10" required />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="card-expiry">Expiración</Label>
                                <Input id="card-expiry" placeholder="MM/YY" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="card-cvv">CVV</Label>
                                <Input id="card-cvv" placeholder="123" required />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500 bg-teal-50 p-3 rounded-lg">
                        <ShieldCheck className="w-4 h-4 text-doctoralia-teal" />
                        <span>Pago seguro procesado mediante Stripe. Tus datos están cifrados.</span>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                            Cancelar
                        </Button>
                        <Button type="submit" className="bg-doctoralia-teal hover:bg-[#059669] min-w-[120px]" disabled={isLoading}>
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Pagar {amount}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default PaymentModal;

