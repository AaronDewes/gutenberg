/**
 * WordPress dependencies
 */
import { addFilter } from '@aarondewes/wp-hooks';
import { MediaUpload } from '@aarondewes/wp-media-utils';

const replaceMediaUpload = () => MediaUpload;

addFilter(
	'editor.MediaUpload',
	'core/edit-post/replace-media-upload',
	replaceMediaUpload
);
