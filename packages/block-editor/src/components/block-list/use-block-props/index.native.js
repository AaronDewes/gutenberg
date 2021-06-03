/**
 * WordPress dependencies
 */
import { __unstableGetBlockProps as getBlockProps } from '@aarondewes/wp-blocks';

export function useBlockProps( props = {} ) {
	return { ...props, style: { ...{ flex: 1 }, ...props.style } };
}

useBlockProps.save = getBlockProps;
