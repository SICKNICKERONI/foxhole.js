# foxhole.js

This is an **unofficial** API wrapper for the game 'Foxhole'

You can find the game here: [Foxhole Game Steam Page](https://store.steampowered.com/app/505460/Foxhole/)

You can find everything relating to the API here: [Foxhole Game API](https://github.com/clapfoot/warapi)

---

## Install

To use this wrapper you can install it with `npm`.

```

npm install foxhole.js

```

> Note: You must have NodeJS version 17.5 or greater to use this package as it uses the NodeJS fetch() API

---

## Usage

```js
// CJS
const { FoxholeAPIClient } = require('foxhole.js');
const client = new FoxholeAPIClient(); // Use 'LIVE1'/'ABLE', 'LIVE2'/'BAKER', 'LIVE3'/'CHARLIE', or 'DEV' to access the different shards. (Optionally leave blank to default to 'LIVE1'/'ABLE')

// ESM
import { FoxholeAPIClient } from 'foxhole.js';
const client = new FoxholeAPIClient();
```

> Note: Just about EVERYTHING returns a promise!

## Examples

This gets the current war state.

```js
// Import...

const state = await client.getWarState(); // Or use .then()
```

This get the casualties across all maps (hexes) and sums them up.

```js
// Import...

const casualties = await client.getTotalCasualties(); // Or use .then()
});
```

---

## API Methods

### `getWarState()`

Gets the current state of the war.

**Returns:** `Promise<CachedWarState | null>`

### `getMapIDs()`

Gets an array of all map (hex) IDs.

**Returns:** `Promise<CachedMapIDs | null>`

### `getWarReport(mapID: string)`

Gets the war report for the specified map (hex).

**Parameters:**

-   `mapID`: The map ID you want data from.

**Returns:** `Promise<CachedWarReportElement | null>`

### `getMapData(mapID: string, type: 'DYNAMIC' | 'STATIC')`

Gets the map data for the specified map (hex).

**Parameters:**

-   `mapID`: The map ID you want data from.
-   `type`: The type of map data you want. ('DYNAMIC' or 'STATIC')

**Returns:** `Promise<CachedMapDataElement | null>`

---

## Helper Methods

### `getCasualties(mapID: string)`

Gets the casualties for the given map ID.

**Parameters:**

-   `mapID`: The map ID you want data from.

**Returns:** `Promise<CasualtyData | null>`

### `getTotalCasualties()`

Gets the total casualties across all maps.

**Returns:** `Promise<CasualtyData | null>`

### `getVictoryTown(mapID: string)`

Gets the victory town in the given map ID.

**Parameters:**

-   `mapID`: The map ID you want data from.

**Returns:** `Promise<MapItemAndText | null>`

### `getAllVictoryTowns()`

Gets every victory town across all maps.

**Returns:** `Promise<MapItemAndText[] | null>`

### `getTrueRequiredVictoryTowns()`

Gets the true amount of required victory towns to win the war.

**Returns:** `Promise<number | null>`

### `getClaimedVictoryTowns()`

Gets the number of victory towns each team owns.

**Returns:** `Promise<ClaimedVictoryTownData | null>`

---

## Miscellaneous Methods

### `getMapTextItemForMapItem(mapID: string, mapItem: MapItem, filters?: MapTextFromMapItemFilter)`

Gets a map text item given a map item.

**Parameters:**

-   `mapID`: The map ID associated with the map item. (Inputting a different map ID than the one associated with the map item will give you a map text item in a different map.)
-   `mapItem`: The map item you want the map text item for.
-   `filters`: Optional filters used to sort between things like farthest map text item and map marker type.

**Returns:** `Promise<MapTextItem | null>`

### `readMapItemFlags(mapItem: MapItem)` (Static)

Processes the flags value of a map item.

**Parameters:**

-   `mapItem`: The map item you want to read the flags of.

**Returns:** `MapFlags`
  
## Extra Information

1/19/2024

While I doubt many used this module in their projects however, if you did, I salute you.

I apologize for not updating the project frequently and I will work to keep up with the API and expansion of the game.

---

Please contact me on Discord or make an issue if you run into any problems using this.

Discord: sicknickeroni