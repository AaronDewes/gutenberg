/**
 * External dependencies
 */
import moment from 'moment';
import memoize from 'memize';

/**
 * WordPress dependencies
 */
import { Disabled } from '@aarondewes/wp-components';
import { useSelect } from '@aarondewes/wp-data';
import ServerSideRender from '@aarondewes/wp-server-side-render';
import { useBlockProps } from '@aarondewes/wp-block-editor';
import { store as editorStore } from '@aarondewes/wp-editor';

const getYearMonth = memoize( ( date ) => {
	if ( ! date ) {
		return {};
	}
	const momentDate = moment( date );
	return {
		year: momentDate.year(),
		month: momentDate.month() + 1,
	};
} );

export default function CalendarEdit( { attributes } ) {
	const date = useSelect( ( select ) => {
		const { getEditedPostAttribute } = select( editorStore );

		const postType = getEditedPostAttribute( 'type' );
		// Dates are used to overwrite year and month used on the calendar.
		// This overwrite should only happen for 'post' post types.
		// For other post types the calendar always displays the current month.
		return postType === 'post'
			? getEditedPostAttribute( 'date' )
			: undefined;
	}, [] );

	return (
		<div { ...useBlockProps() }>
			<Disabled>
				<ServerSideRender
					block="core/calendar"
					attributes={ { ...attributes, ...getYearMonth( date ) } }
				/>
			</Disabled>
		</div>
	);
}
