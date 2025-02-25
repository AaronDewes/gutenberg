/**
 * WordPress dependencies
 */
import { __ } from '@aarondewes/wp-i18n';
import { Button } from '@aarondewes/wp-components';
import {
	chevronRight,
	chevronLeft,
	grid,
	stretchFullWidth,
} from '@aarondewes/wp-icons';

/**
 * Internal dependencies
 */
import { VIEWMODES } from './constants';

const Actions = ( { onStartBlank, onBlockPatternSelect } ) => (
	<div className="block-editor-block-pattern-setup__actions">
		<Button onClick={ onStartBlank }>{ __( 'Start blank' ) }</Button>
		<Button variant="primary" onClick={ onBlockPatternSelect }>
			{ __( 'Choose' ) }
		</Button>
	</div>
);

const CarouselNavigation = ( {
	handlePrevious,
	handleNext,
	activeSlide,
	totalSlides,
} ) => (
	<div className="block-editor-block-pattern-setup__navigation">
		<Button
			icon={ chevronLeft }
			label={ __( 'Previous pattern' ) }
			onClick={ handlePrevious }
			disabled={ activeSlide === 0 }
		/>
		<Button
			icon={ chevronRight }
			label={ __( 'Next pattern' ) }
			onClick={ handleNext }
			disabled={ activeSlide === totalSlides - 1 }
		/>
	</div>
);

const SetupToolbar = ( {
	viewMode,
	setViewMode,
	handlePrevious,
	handleNext,
	activeSlide,
	totalSlides,
	onBlockPatternSelect,
	onStartBlank,
} ) => {
	const isCarouselView = viewMode === VIEWMODES.carousel;
	const displayControls = (
		<div className="block-editor-block-pattern-setup__display-controls">
			<Button
				icon={ stretchFullWidth }
				label={ __( 'Carousel view' ) }
				onClick={ () => setViewMode( VIEWMODES.carousel ) }
				isPressed={ isCarouselView }
			/>
			<Button
				icon={ grid }
				label={ __( 'Grid view' ) }
				onClick={ () => setViewMode( VIEWMODES.grid ) }
				isPressed={ viewMode === VIEWMODES.grid }
			/>
		</div>
	);
	return (
		<div className="block-editor-block-pattern-setup__toolbar">
			{ isCarouselView && (
				<CarouselNavigation
					handlePrevious={ handlePrevious }
					handleNext={ handleNext }
					activeSlide={ activeSlide }
					totalSlides={ totalSlides }
				/>
			) }
			{ displayControls }
			{ isCarouselView && (
				<Actions
					onBlockPatternSelect={ onBlockPatternSelect }
					onStartBlank={ onStartBlank }
				/>
			) }
		</div>
	);
};

export default SetupToolbar;
