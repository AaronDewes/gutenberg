/**
 * WordPress dependencies
 */
import { useEffect, useState } from '@aarondewes/wp-element';
import {
	BlockEditorKeyboardShortcuts,
	BlockEditorProvider,
	BlockList,
	BlockTools,
	BlockInspector,
	WritingFlow,
	ObserveTyping,
} from '@aarondewes/wp-block-editor';
import { Popover, SlotFillProvider } from '@aarondewes/wp-components';
import { registerCoreBlocks } from '@aarondewes/wp-block-library';
import '@aarondewes/wp-format-library';

/**
 * Internal dependencies
 */
import './style.scss';

function App() {
	const [ blocks, updateBlocks ] = useState( [] );

	useEffect( () => {
		registerCoreBlocks();
	}, [] );

	return (
		<div className="playground">
			<SlotFillProvider>
				<BlockEditorProvider
					value={ blocks }
					onInput={ updateBlocks }
					onChange={ updateBlocks }
				>
					<div className="playground__sidebar">
						<BlockInspector />
					</div>
					<div className="playground__content">
						<BlockTools>
							<div className="editor-styles-wrapper">
								<BlockEditorKeyboardShortcuts.Register />
								<BlockEditorKeyboardShortcuts />
								<WritingFlow>
									<ObserveTyping>
										<BlockList />
									</ObserveTyping>
								</WritingFlow>
							</div>
						</BlockTools>
					</div>
					<Popover.Slot />
				</BlockEditorProvider>
			</SlotFillProvider>
		</div>
	);
}

export default {
	title: 'Playground/Block Editor',
};

export const _default = () => {
	return <App />;
};
