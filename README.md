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
const foxhole = new Foxhole(); // Use 'LIVE1', 'LIVE2', or 'DEV' to access the different shards. (Optionally leave blank to default to 'LIVE1')
```
> Note: EVERYTHING returns a promise!

### Examples

This gets current war info about the war.
```js
const Foxhole = require('foxhole.js');
const foxhole = new Foxhole();

foxhole.getState().then((info) => {
    console.log(info); // Alternatively, do something else here.
});
```

This gets the current amount of casualties.
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

### Functions

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

Does the same thing as ``getWarReport(map)`` but for every map (hex) and also returns an object with combined casualties.
``getCasualties()``

## Extra Information

Please contact me on Discord, make an issue, or make a pull request if you run into any problems using this.
Discord: SICKNICKERONI#2437

*This project is in an early state and I plan to update this quite frequently.*