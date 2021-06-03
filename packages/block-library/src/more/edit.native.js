/**
 * External dependencies
 */
import { View } from 'react-native';
import Hr from 'react-native-hr';

/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { Component } from '@aarondewes/wp-element';
import { withPreferredColorScheme } from '@aarondewes/wp-compose';

/**
 * Internal dependencies
 */
import styles from './editor.scss';

export class MoreEdit extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			defaultText: __( 'Read more' ),
		};
	}

	render() {
		const { attributes, getStylesFromColorScheme } = this.props;
		const { customText } = attributes;
		const { defaultText } = this.state;

		const content = customText || defaultText;
		const textStyle = getStylesFromColorScheme(
			styles.moreText,
			styles.moreTextDark
		);
		const lineStyle = getStylesFromColorScheme(
			styles.moreLine,
			styles.moreLineDark
		);

		return (
			<View>
				<Hr
					text={ content }
					marginLeft={ 0 }
					marginRight={ 0 }
					textStyle={ textStyle }
					lineStyle={ lineStyle }
				/>
			</View>
		);
	}
}

export default withPreferredColorScheme( MoreEdit );
