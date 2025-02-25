/**
 * WordPress dependencies
 */
import { __unstableAwaitPromise } from '@aarondewes/wp-data-controls';
import { controls } from '@aarondewes/wp-data';

/**
 * Internal dependencies
 */
import { CORE_STORE_NAME as coreStoreName } from '../utils/constants';

export function* __unstableAcquireStoreLock( store, path, { exclusive } ) {
	const promise = yield* __unstableEnqueueLockRequest( store, path, {
		exclusive,
	} );
	yield* __unstableProcessPendingLockRequests();
	return yield __unstableAwaitPromise( promise );
}

export function* __unstableEnqueueLockRequest( store, path, { exclusive } ) {
	let notifyAcquired;
	const promise = new Promise( ( resolve ) => {
		notifyAcquired = resolve;
	} );
	yield {
		type: 'ENQUEUE_LOCK_REQUEST',
		request: { store, path, exclusive, notifyAcquired },
	};
	return promise;
}

export function* __unstableReleaseStoreLock( lock ) {
	yield {
		type: 'RELEASE_LOCK',
		lock,
	};
	yield* __unstableProcessPendingLockRequests();
}

export function* __unstableProcessPendingLockRequests() {
	yield {
		type: 'PROCESS_PENDING_LOCK_REQUESTS',
	};
	const lockRequests = yield controls.select(
		coreStoreName,
		'__unstableGetPendingLockRequests'
	);
	for ( const request of lockRequests ) {
		const { store, path, exclusive, notifyAcquired } = request;
		const isAvailable = yield controls.select(
			coreStoreName,
			'__unstableIsLockAvailable',
			store,
			path,
			{
				exclusive,
			}
		);
		if ( isAvailable ) {
			const lock = { store, path, exclusive };
			yield {
				type: 'GRANT_LOCK_REQUEST',
				lock,
				request,
			};
			notifyAcquired( lock );
		}
	}
}
