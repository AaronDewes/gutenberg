/**
 * WordPress dependencies
 */
import { Component } from '@aarondewes/wp-element';
import { withSelect } from '@aarondewes/wp-data';

/**
 * Internal dependencies
 */
import { store as editPostStore } from '../../store';

class MetaBoxVisibility extends Component {
	componentDidMount() {
		this.updateDOM();
	}

	componentDidUpdate( prevProps ) {
		if ( this.props.isVisible !== prevProps.isVisible ) {
			this.updateDOM();
		}
	}

	updateDOM() {
		const { id, isVisible } = this.props;

		const element = document.getElementById( id );
		if ( ! element ) {
			return;
		}

		if ( isVisible ) {
			element.classList.remove( 'is-hidden' );
		} else {
			element.classList.add( 'is-hidden' );
		}
	}

	render() {
		return null;
	}
}

export default withSelect( ( select, { id } ) => ( {
	isVisible: select( editPostStore ).isEditorPanelEnabled(
		`meta-box-${ id }`
	),
} ) )( MetaBoxVisibility );
