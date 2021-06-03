/**
 * WordPress dependencies
 */
import { Component } from '@aarondewes/wp-element';
import { __ } from '@aarondewes/wp-i18n';
import { Button } from '@aarondewes/wp-components';
import { select } from '@aarondewes/wp-data';
import { Warning } from '@aarondewes/wp-block-editor';
import { useCopyToClipboard } from '@aarondewes/wp-compose';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';

function CopyButton( { text, children } ) {
	const ref = useCopyToClipboard( text );
	return (
		<Button variant="secondary" ref={ ref }>
			{ children }
		</Button>
	);
}

class ErrorBoundary extends Component {
	constructor() {
		super( ...arguments );

		this.reboot = this.reboot.bind( this );
		this.getContent = this.getContent.bind( this );

		this.state = {
			error: null,
		};
	}

	componentDidCatch( error ) {
		this.setState( { error } );
	}

	reboot() {
		this.props.onError();
	}

	getContent() {
		try {
			// While `select` in a component is generally discouraged, it is
			// used here because it (a) reduces the chance of data loss in the
			// case of additional errors by performing a direct retrieval and
			// (b) avoids the performance cost associated with unnecessary
			// content serialization throughout the lifetime of a non-erroring
			// application.
			return select( editorStore ).getEditedPostContent();
		} catch ( error ) {}
	}

	render() {
		const { error } = this.state;
		if ( ! error ) {
			return this.props.children;
		}

		return (
			<Warning
				className="editor-error-boundary"
				actions={ [
					<Button
						key="recovery"
						onClick={ this.reboot }
						variant="secondary"
					>
						{ __( 'Attempt Recovery' ) }
					</Button>,
					<CopyButton key="copy-post" text={ this.getContent }>
						{ __( 'Copy Post Text' ) }
					</CopyButton>,
					<CopyButton key="copy-error" text={ error.stack }>
						{ __( 'Copy Error' ) }
					</CopyButton>,
				] }
			>
				{ __( 'The editor has encountered an unexpected error.' ) }
			</Warning>
		);
	}
}

export default ErrorBoundary;
