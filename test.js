const FoxholeAPI = require('./index.js');
const foxhole = new FoxholeAPI();

foxhole.getMaps().then(maps => {
    console.log('aa');
    foxhole.getStaticMapData(maps[1]).then(data => {
        console.log(data);
    })
})