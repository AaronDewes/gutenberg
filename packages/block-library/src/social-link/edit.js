/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	URLPopover,
	URLInput,
	useBlockProps,
} from '@aarondewes/wp-block-editor';
import { Fragment, useState } from '@aarondewes/wp-element';
import {
	Button,
	PanelBody,
	PanelRow,
	TextControl,
} from '@aarondewes/wp-components';
import { __, sprintf } from '@aarondewes/wp-i18n';
import { keyboardReturn } from '@aarondewes/wp-icons';

/**
 * Internal dependencies
 */
import { getIconBySite, getNameBySite } from './social-list';

const SocialLinkEdit = ( {
	attributes,
	context,
	isSelected,
	setAttributes,
} ) => {
	const { url, service, label } = attributes;
	const { iconColorValue, iconBackgroundColorValue } = context;
	const [ showURLPopover, setPopover ] = useState( false );
	const classes = classNames( 'wp-social-link', 'wp-social-link-' + service, {
		'wp-social-link__is-incomplete': ! url,
	} );

	const IconComponent = getIconBySite( service );
	const socialLinkName = getNameBySite( service );
	const blockProps = useBlockProps( {
		className: classes,
		style: {
			color: iconColorValue,
			backgroundColor: iconBackgroundColorValue,
		},
	} );

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={ sprintf(
						/* translators: %s: name of the social service. */
						__( '%s label' ),
						socialLinkName
					) }
					initialOpen={ false }
				>
					<PanelRow>
						<TextControl
							label={ __( 'Link label' ) }
							help={ __(
								'Briefly describe the link to help screen reader users.'
							) }
							value={ label }
							onChange={ ( value ) =>
								setAttributes( { label: value } )
							}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<li { ...blockProps }>
				<Button onClick={ () => setPopover( true ) }>
					<IconComponent />
					{ isSelected && showURLPopover && (
						<URLPopover onClose={ () => setPopover( false ) }>
							<form
								className="block-editor-url-popover__link-editor"
								onSubmit={ ( event ) => {
									event.preventDefault();
									setPopover( false );
								} }
							>
								<div className="block-editor-url-input">
									<URLInput
										value={ url }
										onChange={ ( nextURL ) =>
											setAttributes( { url: nextURL } )
										}
										placeholder={ __( 'Enter address' ) }
										disableSuggestions={ true }
									/>
								</div>
								<Button
									icon={ keyboardReturn }
									label={ __( 'Apply' ) }
									type="submit"
								/>
							</form>
						</URLPopover>
					) }
				</Button>
			</li>
		</Fragment>
	);
};

export default SocialLinkEdit;
