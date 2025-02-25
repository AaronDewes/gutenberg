/**
 * External dependencies
 */
import { includes } from 'lodash';

/**
 * WordPress dependencies
 */
import { focus } from '@aarondewes/wp-dom';
import { forwardRef, useCallback } from '@aarondewes/wp-element';
import { UP, DOWN, LEFT, RIGHT } from '@aarondewes/wp-keycodes';

/**
 * Internal dependencies
 */
import RovingTabIndexContainer from './roving-tab-index';

/**
 * Return focusables in a row element, excluding those from other branches
 * nested within the row.
 *
 * @param {Element} rowElement The DOM element representing the row.
 *
 * @return {?Array} The array of focusables in the row.
 */
function getRowFocusables( rowElement ) {
	const focusablesInRow = focus.focusable.find( rowElement );

	if ( ! focusablesInRow || ! focusablesInRow.length ) {
		return;
	}

	return focusablesInRow.filter( ( focusable ) => {
		return focusable.closest( '[role="row"]' ) === rowElement;
	} );
}

/**
 * Renders both a table and tbody element, used to create a tree hierarchy.
 *
 * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/components/src/tree-grid/README.md
 * @param {Object}    props          Component props.
 * @param {WPElement} props.children Children to be rendered.
 * @param {Object}    ref            A ref to the underlying DOM table element.
 */
function TreeGrid( { children, ...props }, ref ) {
	const onKeyDown = useCallback( ( event ) => {
		const { keyCode, metaKey, ctrlKey, altKey, shiftKey } = event;

		const hasModifierKeyPressed = metaKey || ctrlKey || altKey || shiftKey;

		if (
			hasModifierKeyPressed ||
			! includes( [ UP, DOWN, LEFT, RIGHT ], keyCode )
		) {
			return;
		}

		// The event will be handled, stop propagation.
		event.stopPropagation();

		const { activeElement } = document;
		const { currentTarget: treeGridElement } = event;
		if ( ! treeGridElement.contains( activeElement ) ) {
			return;
		}

		// Calculate the columnIndex of the active element.
		const activeRow = activeElement.closest( '[role="row"]' );
		const focusablesInRow = getRowFocusables( activeRow );
		const currentColumnIndex = focusablesInRow.indexOf( activeElement );

		if ( includes( [ LEFT, RIGHT ], keyCode ) ) {
			// Calculate to the next element.
			let nextIndex;
			if ( keyCode === LEFT ) {
				nextIndex = Math.max( 0, currentColumnIndex - 1 );
			} else {
				nextIndex = Math.min(
					currentColumnIndex + 1,
					focusablesInRow.length - 1
				);
			}

			// Focus is either at the left or right edge of the grid. Do nothing.
			if ( nextIndex === currentColumnIndex ) {
				// Prevent key use for anything else. For example, Voiceover
				// will start reading text on continued use of left/right arrow
				// keys.
				event.preventDefault();
				return;
			}

			// Focus the next element.
			focusablesInRow[ nextIndex ].focus();

			// Prevent key use for anything else. This ensures Voiceover
			// doesn't try to handle key navigation.
			event.preventDefault();
		} else if ( includes( [ UP, DOWN ], keyCode ) ) {
			// Calculate the rowIndex of the next row.
			const rows = Array.from(
				treeGridElement.querySelectorAll( '[role="row"]' )
			);
			const currentRowIndex = rows.indexOf( activeRow );
			let nextRowIndex;

			if ( keyCode === UP ) {
				nextRowIndex = Math.max( 0, currentRowIndex - 1 );
			} else {
				nextRowIndex = Math.min( currentRowIndex + 1, rows.length - 1 );
			}

			// Focus is either at the top or bottom edge of the grid. Do nothing.
			if ( nextRowIndex === currentRowIndex ) {
				// Prevent key use for anything else. For example, Voiceover
				// will start navigating horizontally when reaching the vertical
				// bounds of a table.
				event.preventDefault();
				return;
			}

			// Get the focusables in the next row.
			const focusablesInNextRow = getRowFocusables(
				rows[ nextRowIndex ]
			);

			// If for some reason there are no focusables in the next row, do nothing.
			if ( ! focusablesInNextRow || ! focusablesInNextRow.length ) {
				// Prevent key use for anything else. For example, Voiceover
				// will still focus text when using arrow keys, while this
				// component should limit navigation to focusables.
				event.preventDefault();
				return;
			}

			// Try to focus the element in the next row that's at a similar column to the activeElement.
			const nextIndex = Math.min(
				currentColumnIndex,
				focusablesInNextRow.length - 1
			);
			focusablesInNextRow[ nextIndex ].focus();

			// Prevent key use for anything else. This ensures Voiceover
			// doesn't try to handle key navigation.
			event.preventDefault();
		}
	}, [] );

	/* Disable reason: A treegrid is implemented using a table element. */
	/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
	return (
		<RovingTabIndexContainer>
			<table
				{ ...props }
				role="treegrid"
				onKeyDown={ onKeyDown }
				ref={ ref }
			>
				<tbody>{ children }</tbody>
			</table>
		</RovingTabIndexContainer>
	);
	/* eslint-enable jsx-a11y/no-noninteractive-element-to-interactive-role */
}

export default forwardRef( TreeGrid );
export { default as TreeGridRow } from './row';
export { default as TreeGridCell } from './cell';
export { default as TreeGridItem } from './item';
