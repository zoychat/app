import { TamaguiProvider, ThemeProvider } from '@tamagui/core';
import type { PropsWithChildren } from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import config from '../../tamagui.config';

export function Providers({ children }: PropsWithChildren) {
	return (
		<TamaguiProvider disableRootThemeClass config={config}>
			<ThemeProvider defaultTheme="light">
				<RootSiblingParent>{children}</RootSiblingParent>
			</ThemeProvider>
		</TamaguiProvider>
	);
}
