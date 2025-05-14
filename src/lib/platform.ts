
import { App } from '@capacitor/app';

// Check if we're running in a Capacitor native app
export async function isNativePlatform(): Promise<boolean> {
  try {
    const info = await App.getInfo();
    return !!info.id; // If we can get app info, we're in a native app
  } catch (e) {
    return false; // If this fails, we're probably in a browser
  }
}

// Get platform-specific styles
export function getPlatformClass(): string {
  // Check if we're on Android by checking the user agent
  const isAndroid = typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent);
  
  if (isAndroid) {
    return 'platform-android';
  }
  
  return ''; // Default
}

// Apply platform-specific adjustments
export function applyPlatformAdjustments(): void {
  // Add platform class to body
  if (typeof document !== 'undefined') {
    document.body.classList.add(getPlatformClass());
  }
}
