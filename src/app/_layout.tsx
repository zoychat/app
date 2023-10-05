import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
	Inter_400Regular,
	Inter_600SemiBold,
	Inter_700Bold,
	Inter_800ExtraBold,
	useFonts,
} from '@expo-google-fonts/inter';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen as ExpoSplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { NativeWindStyleSheet, useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import { withSentry } from '~lib/sentry';
import { FONT_LOAD_DELAY, SCREEN_TRANSITION_DELAY } from '~util/constants';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
	initialRouteName: '(tabs)',
};

NativeWindStyleSheet.setOutput({
	default: 'native',
});

function RootLayout() {
	const [loaded, error] = useFonts({
		Inter_400Regular,
		Inter_600SemiBold,
		Inter_700Bold,
		Inter_800ExtraBold,
		...FontAwesome.font,
	});

	const [appState, setAppState] = useState({
		fontsLoaded: false,
		isDelayOver: false,
		screenReady: false,
	});

	const { colorScheme } = useColorScheme();

	useEffect(() => {
		if (loaded) {
			ExpoSplashScreen.hideAsync();
			setAppState((prev) => ({ ...prev, fontsLoaded: true }));
		}

		if (error) {
			throw error;
		}
	}, [loaded, error]);

	useEffect(() => {
		if (appState.fontsLoaded) {
			const timer = setTimeout(() => {
				setAppState((prev) => ({ ...prev, isDelayOver: true }));
			}, FONT_LOAD_DELAY);

			return () => clearTimeout(timer);
		}
	}, [appState.fontsLoaded]);

	useEffect(() => {
		if (appState.isDelayOver) {
			setTimeout(() => {
				setAppState((prev) => ({ ...prev, screenReady: true }));
			}, SCREEN_TRANSITION_DELAY);
		}
	}, [appState.isDelayOver]);

	if (!loaded || !appState.isDelayOver) {
		return <ExpoSplashScreen />;
	}

	if (appState.screenReady) {
		return (
			<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
				<RootSiblingParent>
					<Stack screenOptions={{ headerShown: false }}>
						<Stack.Screen name="(root)" />
					</Stack>
					<StatusBar />
				</RootSiblingParent>
			</ThemeProvider>
		);
	}
}

export default withSentry(RootLayout);
