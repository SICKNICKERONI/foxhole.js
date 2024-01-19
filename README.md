# foxhole.js

This is an **unofficial** API wrapper for the game 'Foxhole'

You can find the game here: [Foxhole Game Steam Page](https://store.steampowered.com/app/505460/Foxhole/)

You can find everything relating to the API here: [Foxhole Game API](https://github.com/clapfoot/warapi)

## Install

To use this wrapper you can install it with `npm`.
```
npm install foxhole.js
```
> Note: You must have NodeJS version 17.5 or greater to use this package as it uses the NodeJS fetch() API

## Usage

```js
const Foxhole = require('foxhole.js');
const foxhole = new Foxhole(); // Use 'LIVE1'/'ABLE', 'LIVE2'/'BAKER', 'LIVE3'/'CHARLIE', or 'DEV' to access the different shards. (Optionally leave blank to default to 'LIVE1')
```
> Note: EVERYTHING returns a promise!

### Examples

This gets the current war state.
```js
const Foxhole = require('foxhole.js');
const foxhole = new Foxhole();

foxhole.getState().then((info) => {
    console.log(info); // Alternatively, do something else here.
});
```

This get the casualties across all maps (hexes) and sums them up.
```js
const Foxhole = require('foxhole.js');
const foxhole = new Foxhole();

foxhole.getCasualties().then((casualties) => {
    console.log(casualties); // Alternatively, do something else here.
});
```

This gets an array of all the map (hex) names.
```js
const Foxhole = require('foxhole.js');
const foxhole = new Foxhole();

foxhole.getMaps().then((maps) => {
    console.log(maps); // Alternatively, do something else here.
});
```

### API Methods

Gets current state of the war.
``getState()``

Gets an array of all map (hex) names.
``getMaps()``

Gets the war report for the specified map (hex).
``getWarReport(map)``

Gets the dynamic map data for the specified map (hex).
``getDynamicMapData(map)``

Gets the static map data for the specified map (hex).
``getStaticMapData(map)``

### Convenience Methods

Gets the war report for each map and sums up the casualties.
``getCasualties()``

## Extra Information

1/19/2024
While I doubt many used this module in their projects however, if you did, I salute you.
I apologize for not updating the project frequently and I will work to keep up with the API and expansion of the game.

Please contact me on Discord, make an issue, or make a pull request if you run into any problems using this.
Discord: sicknickeroni