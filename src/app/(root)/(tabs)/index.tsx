import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '~components/Button';
import { ExternalLink } from '~components/ExternalLink';
import { cn } from '~lib/util';

export default function Index() {
	const { colorScheme } = useColorScheme();

	return (
		<SafeAreaView
			className={cn('flex items-center justify-center h-full', {
				'bg-black': colorScheme === 'dark',
				'bg-white': colorScheme === 'light',
			})}
		>
			<ExternalLink href="https://github.com/zoychat">
				<Button label="GitHub" />
			</ExternalLink>

			<StatusBar />
		</SafeAreaView>
	);
}
