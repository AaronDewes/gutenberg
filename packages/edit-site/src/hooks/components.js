/**
 * WordPress dependencies
 */
import { addFilter } from '@aarondewes/wp-hooks';
import { MediaUpload } from '@aarondewes/wp-media-utils';

addFilter(
	'editor.MediaUpload',
	'core/edit-site/components/media-upload',
	() => MediaUpload
);
