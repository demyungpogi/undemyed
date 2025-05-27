import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts,
    Inter_100Thin,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold } from '@expo-google-fonts/inter';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { PaperProvider } from 'react-native-paper';
import { initializeTables } from '@/store/useDbStore';
const SpaceMonoFont = require('@/assets/fonts/SpaceMono-Regular.ttf');
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '@/contexts/authContext';

export {
/* Catch any errors thrown by the Layout component. */
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    initialRouteName: '(screens)',
};

/* Prevent the splash screen from auto-hiding before asset loading is complete. */
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const {theme} = useTheme();
    const [is_db_initialized, setInitializedDB] = useState(false);

    const [loaded, error] = useFonts({
        SpaceMonoFont,
        Inter_100Thin,
        Inter_300Light,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
        ...FontAwesome.font,
    });

    /* Expo Router uses Error Boundaries to catch errors in the navigation tree. */
    useEffect(() => {
        if (error) {
            throw error;
        }
    }, [error]);

    useEffect(() => {
        if (loaded) {
            initializeTables().then(async () => {
                setInitializedDB(true);
            });
        }
    }, [loaded]);

    useEffect(() => {
        if (is_db_initialized) {
            SplashScreen.hideAsync();   
        }
    }, [is_db_initialized]);

    if (!loaded) {
        return null;
    }

    return (
        <GestureHandlerRootView >
            <AuthProvider>
                <PaperProvider theme={theme}>
                    <Stack>
                        <Stack.Screen
                            name="(screens)/index"
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="(tabs)"
                            options={{ headerShown: false }} 
                        />
                    </Stack>
                </PaperProvider>
            </AuthProvider>
        </GestureHandlerRootView>

    )
}