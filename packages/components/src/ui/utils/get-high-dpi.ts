/**
 * External dependencies
 */
import type { InterpolationPrimitive } from '@emotion/serialize';
import { css } from '@emotion/css';

export function getHighDpi(
	strings: TemplateStringsArray,
	...interpolations: InterpolationPrimitive[]
) {
	const interpolatedStyles = css( strings, ...interpolations );

	return css`
		@media ( -webkit-min-device-pixel-ratio: 1.25 ),
			( min-resolution: 120dpi ) {
			${ interpolatedStyles }
		}
	`;
}
