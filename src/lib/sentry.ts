import type { FC } from 'react';
import * as Sentry from 'sentry-expo';
import { isNative, isWeb } from '~util/detection';

export const getRoutingInstrumentation = () => {
	return new Sentry.Native.ReactNavigationInstrumentation();
};

Sentry.init({
	dsn: 'https://22ea6dc9b6e82905530e8c9a0ec63e10@o4505969265672192.ingest.sentry.io/4505994560143360',
	enableInExpoDevelopment: false,
	debug: false,
	environment: __DEV__ ? 'development' : 'production',
	tracesSampleRate: 0.5,
	integrations: isNative
		? [
				new Sentry.Native.ReactNativeTracing({
					shouldCreateSpanForRequest: (url) => {
						return !url.endsWith('/logs');
					},
					routingInstrumentation: getRoutingInstrumentation(),
				}),
		  ]
		: [],
});

export function getSentryClient() {
	if (isWeb) {
		return Sentry.Browser;
	}

	return Sentry.Native;
}

export function withSentry(Component: FC) {
	if (isWeb) {
		return Component;
	}

	const sentryClient = getSentryClient();

	return sentryClient.wrap(Component);
}
