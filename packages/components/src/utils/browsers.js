/**
 * External dependencies
 */
import { css } from '@emotion/css';

/* eslint-disable jsdoc/no-undefined-types */
/**
 * @param {TemplateStringsArray} strings
 * @param  {import('@emotion/serialize').InterpolationPrimitive[]} interpolations
 */
export function firefoxOnly( strings, ...interpolations ) {
	const interpolatedStyles = css( strings, ...interpolations );

	return css`
		@-moz-document url-prefix() {
			${ interpolatedStyles };
		}
	`;
}

/**
 * @param {TemplateStringsArray} strings
 * @param  {import('@emotion/serialize').InterpolationPrimitive[]} interpolations
 */
export function safariOnly( strings, ...interpolations ) {
	const interpolatedStyles = css( strings, ...interpolations );

	return css`
		@media not all and ( min-resolution: 0.001dpcm ) {
			@supports ( -webkit-appearance: none ) {
				${ interpolatedStyles }
			}
		}
	`;
}
/* eslint-enable jsdoc/no-undefined-types */
