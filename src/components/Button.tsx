import { Text, TouchableOpacity } from 'react-native';

const defaultContainerClasses = 'py-2 px-5 rounded-lg';
const defaultLabelClasses = 'text-base text-center text-white dark:text-black';
const buttonVariants = {
	default: 'bg-black dark:bg-white',
	secondary: 'bg-gray-500',
	ghost: 'bg-slate-700',
	destructive: 'bg-red-500',
};

interface ButtonProps {
	readonly containerClasses?: string;
	readonly label: string;
	readonly labelClasses?: string;
	onPress?(): void;
	readonly variant?: keyof typeof buttonVariants;
}
export function Button({
	label,
	containerClasses = defaultContainerClasses,
	labelClasses = defaultLabelClasses,
	variant = 'default',
	onPress = () => undefined,
}: ButtonProps) {
	return (
		<TouchableOpacity
			className={`${containerClasses} ${containerClasses === defaultContainerClasses && buttonVariants[variant]}`}
			onPress={onPress}
		>
			<Text className={labelClasses}>{label}</Text>
		</TouchableOpacity>
	);
}
