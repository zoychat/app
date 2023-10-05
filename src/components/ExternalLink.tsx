import { open as TauriOpen } from '@tauri-apps/api/shell';
import { Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import type { ComponentProps } from 'react';
import { isDesktop, isNative } from '~util/detection';

type ExternalLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & { readonly href: string };

export function ExternalLink(props: ExternalLinkProps) {
	return (
		<Link
			hrefAttrs={{
				target: '_blank',
			}}
			{...props}
			// @ts-expect-error: External URLs are not typed.
			href={props.href}
			onPress={(event) => {
				if (isNative) {
					event.preventDefault();

					void WebBrowser.openBrowserAsync(props.href as string);
				}

				if (isDesktop) {
					event.preventDefault();

					void TauriOpen(props.href as string);
				}
			}}
		/>
	);
}
