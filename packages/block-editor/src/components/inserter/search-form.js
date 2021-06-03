/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useInstanceId } from '@aarondewes/wp-compose';
import { __ } from '@aarondewes/wp-i18n';
import { VisuallyHidden, Button } from '@aarondewes/wp-components';
import { Icon, search, closeSmall } from '@aarondewes/wp-icons';
import { useRef } from '@aarondewes/wp-element';

function InserterSearchForm( {
	className,
	onChange,
	value,
	label,
	placeholder,
} ) {
	const instanceId = useInstanceId( InserterSearchForm );
	const searchInput = useRef();

	return (
		<div
			className={ classnames(
				'block-editor-inserter__search',
				className
			) }
		>
			<VisuallyHidden
				as="label"
				htmlFor={ `block-editor-inserter__search-${ instanceId }` }
			>
				{ label || placeholder }
			</VisuallyHidden>
			<input
				ref={ searchInput }
				className="block-editor-inserter__search-input"
				id={ `block-editor-inserter__search-${ instanceId }` }
				type="search"
				placeholder={ placeholder }
				onChange={ ( event ) => onChange( event.target.value ) }
				autoComplete="off"
				value={ value || '' }
			/>
			<div className="block-editor-inserter__search-icon">
				{ !! value && (
					<Button
						icon={ closeSmall }
						label={ __( 'Reset search' ) }
						onClick={ () => {
							onChange( '' );
							searchInput.current.focus();
						} }
					/>
				) }
				{ ! value && <Icon icon={ search } /> }
			</div>
		</div>
	);
}

export default InserterSearchForm;
