/**
 * WordPress dependencies
 */
import { createBlobURL } from '@aarondewes/wp-blob';
import { createBlock } from '@aarondewes/wp-blocks';

const transforms = {
	from: [
		{
			type: 'files',
			isMatch( files ) {
				return (
					files.length === 1 &&
					files[ 0 ].type.indexOf( 'audio/' ) === 0
				);
			},
			transform( files ) {
				const file = files[ 0 ];
				// We don't need to upload the media directly here
				// It's already done as part of the `componentDidMount`
				// in the audio block
				const block = createBlock( 'core/audio', {
					src: createBlobURL( file ),
				} );

				return block;
			},
		},
		{
			type: 'shortcode',
			tag: 'audio',
			attributes: {
				src: {
					type: 'string',
					shortcode: ( {
						named: { src, mp3, m4a, ogg, wav, wma },
					} ) => {
						return src || mp3 || m4a || ogg || wav || wma;
					},
				},
				loop: {
					type: 'string',
					shortcode: ( { named: { loop } } ) => {
						return loop;
					},
				},
				autoplay: {
					type: 'string',
					shortcode: ( { named: { autoplay } } ) => {
						return autoplay;
					},
				},
				preload: {
					type: 'string',
					shortcode: ( { named: { preload } } ) => {
						return preload;
					},
				},
			},
		},
	],
};

export default transforms;
