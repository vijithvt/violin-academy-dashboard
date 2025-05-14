
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.860d59a21d794168b3f9fa4f2be37cce',
  appName: 'violin-academy-dashboard',
  webDir: 'dist',
  server: {
    url: 'https://860d59a2-1d79-4168-b3f9-fa4f2be37cce.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    backgroundColor: '#FFFFFF'
  }
};

export default config;
