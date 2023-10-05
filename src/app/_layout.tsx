import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen as ExpoSplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { withSentry } from '~lib/sentry';
import { FONT_LOAD_DELAY, SCREEN_TRANSITION_DELAY } from '~util/constants';
import { Providers } from './providers';

import('@tamagui/core/reset.css');

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
	initialRouteName: '(tabs)',
};

function RootLayout() {
	const [loaded, error] = useFonts({
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
		...FontAwesome.font,
	});

	const [appState, setAppState] = useState({
		fontsLoaded: false,
		isDelayOver: false,
		screenReady: false,
	});

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
		return null;
	}

	if (appState.screenReady) {
		return (
			<Providers>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="(root)" />
				</Stack>

				<StatusBar />
			</Providers>
		);
	}
}

export default withSentry(RootLayout);
