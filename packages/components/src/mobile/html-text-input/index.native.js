/**
 * External dependencies
 */
import { TextInput } from 'react-native';

/**
 * WordPress dependencies
 */
import { Component } from '@aarondewes/wp-element';
import { __ } from '@aarondewes/wp-i18n';
import { parse } from '@aarondewes/wp-blocks';
import { withDispatch, withSelect } from '@aarondewes/wp-data';
import { addFilter, removeFilter } from '@aarondewes/wp-hooks';
import {
	withInstanceId,
	compose,
	withPreferredColorScheme,
} from '@aarondewes/wp-compose';

/**
 * Internal dependencies
 */
import HTMLInputContainer from './container';
import styles from './style.scss';

export class HTMLTextInput extends Component {
	constructor() {
		super( ...arguments );

		this.edit = this.edit.bind( this );
		this.stopEditing = this.stopEditing.bind( this );
		this.getHTMLForParent = this.getHTMLForParent.bind( this );
		addFilter(
			'native.persist-html',
			'html-text-input',
			this.getHTMLForParent
		);

		this.state = {};
	}

	static getDerivedStateFromProps( props, state ) {
		if ( state.isDirty ) {
			return null;
		}

		return {
			value: props.value,
			isDirty: false,
		};
	}

	componentWillUnmount() {
		removeFilter( 'native.persist-html', 'html-text-input' );
		//TODO: Blocking main thread
		this.stopEditing();
	}

	edit( html ) {
		this.props.onChange( html );
		this.setState( { value: html, isDirty: true } );
	}

	getHTMLForParent() {
		return this.state.value;
	}

	stopEditing() {
		if ( this.state.isDirty ) {
			this.props.onPersist( this.state.value );
			this.setState( { isDirty: false } );
		}
	}

	render() {
		const { getStylesFromColorScheme } = this.props;
		const htmlStyle = getStylesFromColorScheme(
			styles.htmlView,
			styles.htmlViewDark
		);
		const placeholderStyle = getStylesFromColorScheme(
			styles.placeholder,
			styles.placeholderDark
		);
		return (
			<HTMLInputContainer parentHeight={ this.props.parentHeight }>
				<TextInput
					autoCorrect={ false }
					accessibilityLabel="html-view-title"
					textAlignVertical="center"
					numberOfLines={ 1 }
					style={ styles.htmlViewTitle }
					value={ this.props.title }
					placeholder={ __( 'Add title' ) }
					placeholderTextColor={ placeholderStyle.color }
					onChangeText={ this.props.editTitle }
				/>
				<TextInput
					autoCorrect={ false }
					accessibilityLabel="html-view-content"
					textAlignVertical="top"
					multiline
					style={ htmlStyle }
					value={ this.state.value }
					onChangeText={ this.edit }
					onBlur={ this.stopEditing }
					placeholder={ __( 'Start writing…' ) }
					placeholderTextColor={ placeholderStyle.color }
					scrollEnabled={ HTMLInputContainer.scrollEnabled }
				/>
			</HTMLInputContainer>
		);
	}
}

export default compose( [
	withSelect( ( select ) => {
		const { getEditedPostAttribute, getEditedPostContent } = select(
			'core/editor'
		);

		return {
			title: getEditedPostAttribute( 'title' ),
			value: getEditedPostContent(),
		};
	} ),
	withDispatch( ( dispatch ) => {
		const { editPost, resetEditorBlocks } = dispatch( 'core/editor' );
		return {
			editTitle( title ) {
				editPost( { title } );
			},
			onChange( content ) {
				editPost( { content } );
			},
			onPersist( content ) {
				const blocks = parse( content );
				resetEditorBlocks( blocks );
			},
		};
	} ),
	withInstanceId,
	withPreferredColorScheme,
] )( HTMLTextInput );
