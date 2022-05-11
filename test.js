const FoxholeAPI = require('./index.js');
const foxhole = new FoxholeAPI();

foxhole.getDynamicMapData("HowlCountyHex").then(data => {
    console.log(data);
})