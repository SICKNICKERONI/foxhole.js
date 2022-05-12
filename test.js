const FoxholeAPI = require('./index.js');
const foxhole = new FoxholeAPI();

foxhole.getMaps().then(map => {
    foxhole.getDynamicMapData(map[1]).then(data => {
        console.log(data);
    });
})
    