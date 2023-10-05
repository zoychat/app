import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Anchor, useTheme } from 'tamagui';

export default function Page() {
	const theme = useTheme();

	return (
		<SafeAreaView
			style={{
				backgroundColor: theme.background.val,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100%',
			}}
		>
			<Anchor textDecorationLine="none" href="https://github.com/zoychat" target="_blank">
				<Button size="$6">GitHub</Button>
			</Anchor>

			<StatusBar />
		</SafeAreaView>
	);
}
