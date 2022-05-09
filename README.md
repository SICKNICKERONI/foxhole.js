# foxhole.js

This is an **unofficial** API wrapper for the game 'Foxhole'
You can find the game here: [Foxhole Game Steam Page](https://store.steampowered.com/app/505460/Foxhole/)

## Install

To use this wrapper you can install it with `npm`.
```
npm install foxhole.js
```
> Note: You must have NodeJS version 17.5 or greater to use this package as it uses then experimental NodeJS Core fetch() API

## Usage

```js
const Foxhole = require('foxhole.js');
const foxhole = new Foxhole(); // Use 'LIVE1', 'LIVE2', or 'DEV' to access the different shards. (Optionally leave blank to default to 'LIVE1')
```

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

## Extra Information

Please contact me on Discord, make an issue, or make a pull request if you run into any problems using this.
Discord: SICKNICKERONI#2437

*This project is in an early state and I plan to update this quite frequently.*