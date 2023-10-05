module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			'@babel/plugin-proposal-export-namespace-from',
			'transform-inline-environment-variables',
			'expo-router/babel',
			[
				'@tamagui/babel-plugin',
				{
					components: ['tamagui'],
					config: './tamagui.config.ts',
					logTimings: true,
				},
			],
			[
				'module-resolver',
				{
					root: ['./'],
					extensions: ['.ts', '.tsx', '.json'],
					alias: {
						'~app': './src/app',
						'~components': './src/components',
						'~lib': './src/lib',
						'~util': './src/util',
					},
				},
			],
			'react-native-reanimated/plugin',
		],
	};
};
