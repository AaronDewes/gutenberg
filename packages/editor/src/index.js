/**
 * WordPress dependencies
 */
import '@aarondewes/wp-block-editor';
import '@aarondewes/wp-core-data';
import '@aarondewes/wp-rich-text';

/**
 * Internal dependencies
 */
import './hooks';

export { storeConfig, store } from './store';
export * from './components';
export * from './utils';

/*
 * Backward compatibility
 */
export { transformStyles } from '@aarondewes/wp-block-editor';
