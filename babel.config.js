module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			'@babel/plugin-proposal-export-namespace-from',
			'nativewind/babel',
			'react-native-reanimated/plugin',
			'expo-router/babel',
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
		],
	};
};
