jest.mock( '@aarondewes/wp-compose', () => {
	const App = () => null;
	return {
		...jest.requireActual( '@aarondewes/wp-compose' ),
		useViewportMatch: jest.fn(),
		useResizeObserver: jest.fn( () => [
			<App key={ 'mock-key' } />,
			{ width: 700, height: 500 },
		] ),
	};
} );
