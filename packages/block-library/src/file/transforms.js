/**
 * External dependencies
 */
import { includes } from 'lodash';

/**
 * WordPress dependencies
 */
import { createBlobURL } from '@aarondewes/wp-blob';
import { createBlock } from '@aarondewes/wp-blocks';
import { select } from '@aarondewes/wp-data';
import { store as coreStore } from '@aarondewes/wp-core-data';

const transforms = {
	from: [
		{
			type: 'files',
			isMatch( files ) {
				return files.length > 0;
			},
			// We define a lower priorty (higher number) than the default of 10. This
			// ensures that the File block is only created as a fallback.
			priority: 15,
			transform: ( files ) => {
				const blocks = [];

				files.forEach( ( file ) => {
					const blobURL = createBlobURL( file );

					// File will be uploaded in componentDidMount()
					blocks.push(
						createBlock( 'core/file', {
							href: blobURL,
							fileName: file.name,
							textLinkHref: blobURL,
						} )
					);
				} );

				return blocks;
			},
		},
		{
			type: 'block',
			blocks: [ 'core/audio' ],
			transform: ( attributes ) => {
				return createBlock( 'core/file', {
					href: attributes.src,
					fileName: attributes.caption,
					textLinkHref: attributes.src,
					id: attributes.id,
					anchor: attributes.anchor,
				} );
			},
		},
		{
			type: 'block',
			blocks: [ 'core/video' ],
			transform: ( attributes ) => {
				return createBlock( 'core/file', {
					href: attributes.src,
					fileName: attributes.caption,
					textLinkHref: attributes.src,
					id: attributes.id,
					anchor: attributes.anchor,
				} );
			},
		},
		{
			type: 'block',
			blocks: [ 'core/image' ],
			transform: ( attributes ) => {
				return createBlock( 'core/file', {
					href: attributes.url,
					fileName: attributes.caption,
					textLinkHref: attributes.url,
					id: attributes.id,
					anchor: attributes.anchor,
				} );
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/audio' ],
			isMatch: ( { id } ) => {
				if ( ! id ) {
					return false;
				}
				const { getMedia } = select( coreStore );
				const media = getMedia( id );
				return !! media && includes( media.mime_type, 'audio' );
			},
			transform: ( attributes ) => {
				return createBlock( 'core/audio', {
					src: attributes.href,
					caption: attributes.fileName,
					id: attributes.id,
					anchor: attributes.anchor,
				} );
			},
		},
		{
			type: 'block',
			blocks: [ 'core/video' ],
			isMatch: ( { id } ) => {
				if ( ! id ) {
					return false;
				}
				const { getMedia } = select( coreStore );
				const media = getMedia( id );
				return !! media && includes( media.mime_type, 'video' );
			},
			transform: ( attributes ) => {
				return createBlock( 'core/video', {
					src: attributes.href,
					caption: attributes.fileName,
					id: attributes.id,
					anchor: attributes.anchor,
				} );
			},
		},
		{
			type: 'block',
			blocks: [ 'core/image' ],
			isMatch: ( { id } ) => {
				if ( ! id ) {
					return false;
				}
				const { getMedia } = select( coreStore );
				const media = getMedia( id );
				return !! media && includes( media.mime_type, 'image' );
			},
			transform: ( attributes ) => {
				return createBlock( 'core/image', {
					url: attributes.href,
					caption: attributes.fileName,
					id: attributes.id,
					anchor: attributes.anchor,
				} );
			},
		},
	],
};

export default transforms;
