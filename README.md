# CareSalud iOS App

CareSalud mobile application built with Expo and React Native.

## Features

- Built with Expo, React Native & NativeWind
- Dark/light mode support
- Fully customizable components
- TypeScript support
- iOS and Android compatible

## Getting Started

```bash
# Use Node.js v20
nvm use 20

# Install dependencies
cd propia
npm install

# Handle peer dependency issues
npm install --legacy-peer-deps

# Start the Expo development server with a clean cache
npx expo start -c
```

## Deployment

This app is configured for deployment with Expo Launch (EAS).

### Build for iOS

```bash
cd propia
eas build --platform ios
```

### Build for Android

```bash
cd propia
eas build --platform android
```

## Project Structure

The iOS app code is located in the `propia/` directory.

## License

Private - CareSalud Spain S.L.

