/**
 * WordPress dependencies
 */
import { useEffect, useLayoutEffect } from '@aarondewes/wp-element';

/**
 * Copied from `@aarondewes/wp-compose` in order for us to be able to maintain all the types for the ui folder
 */
export const useIsomorphicLayoutEffect =
	typeof window !== 'undefined' ? useLayoutEffect : useEffect;
