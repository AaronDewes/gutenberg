# Discourage passing string literals to reference data stores (data-no-store-string-literals)

Ensures that string literals aren't used for accessing `@aarondewes/wp-data` stores when using API methods. The store definition is promoted as the preferred way of referencing registered stores.

## Rule details

Examples of **incorrect** code for this rule:

```js
import { select } from '@aarondewes/wp-data';

const blockTypes = select( 'core/blocks' ).getBlockTypes();
```

Examples of **correct** code for this rule:

```js
import { store as blocksStore } from '@aarondewes/wp-blocks';
import { select } from '@aarondewes/wp-data';

const blockTypes = select( blocksStore ).getBlockTypes();
```
