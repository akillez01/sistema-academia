import { AuthProvider, useAuth } from '@/context/AuthContext';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();
  const { user, loading } = useAuth();
  const router = useRouter();

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
  });

  // Só esconde o splash quando tudo estiver pronto
  useEffect(() => {
    if ((fontsLoaded || fontError) && !loading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, loading]);

  // Redireciona só quando tudo estiver pronto
  useEffect(() => {
    if (!loading && fontsLoaded && !user) {
      router.replace('/auth');
    }
  }, [user, loading, fontsLoaded]);

  if (!fontsLoaded || loading) {
    return null;
  }

  return (
    <AuthProvider>
      <>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="auth" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="light" backgroundColor="#000000" />
      </>
    </AuthProvider>
  );
}