// Caching objects
let casualties = {
    maps: {},
    total: {
        wardens: 0,
        colonials: 0,        
        combined: 0
    }
};
let dynamic = {
    maps: {}
};


class FoxholeAPI {
    
    /**
     * @param {string} shard The shard you want to get info from. (e.g 'LIVE1' or leave blank, 'LIVE2', 'LIVE3', or 'DEV')
     * 
     * Constructor for the FoxholeAPI class.
     */
    constructor(shard) {
        const lowerShard = shard ? shard.toLowerCase() : false;
        switch(true) {
            case !lowerShard || ["live1", "able"].includes(lowerShard):
                this.rootURL = 'https://war-service-live.foxholeservices.com/api';
                break;
            case ["live2", "baker"].includes(lowerShard):
                this.rootURL = 'https://war-service-live-2.foxholeservices.com/api';
                break;
            case ["live3", "charlie"].includes(lowerShard):
                this.rootURL = 'https://war-service-live-3.foxholeservices.com/api';
                break;
            case lowerShard === 'dev':
                this.rootURL = 'https://war-service-dev.foxholeservices.com/api';
                break;
            default:
                console.error("Invalid shard! Defaulting to LIVE1/ABLE.");
                this.rootURL = 'https://war-service-live.foxholeservices.com/api';
                break;
        }
    }

    //---------------------//
    //     API Methods     //
    //---------------------//

    /**
     * Gets the current state of the war.
     * 
     * @returns Returns an object with the war state data.
     */
    async getState() {
        const response = await fetch(`${this.rootURL}/worldconquest/war`);
        const data = await response.json();

        return data;
    }

    /**
     * Gets all the map IDs.
     * 
     * @returns Returns an array of all map IDs.
     */
    async getMaps() {
        const response = await fetch(`${this.rootURL}/worldconquest/maps`);
        const data = await response.json();

        return data;
    }

    /**
     * @param {string} map Map ID you want data from.
     * 
     * Gets the war report for the provided map ID.
     * 
     * @returns Returns an object with the war report data.
     */

    async getWarReport(map) {
        const etag = Object.hasOwn(casualties.maps, casualties.etag) ? casualties.maps[map].etag : '';
        const response = await fetch(`${this.rootURL}/worldconquest/warReport/${map}`, { headers: { 'If-None-Match': etag } });
        if (response.status === 200) {
            const report = await response.json();

            Object.assign(casualties.maps, {
                [map]: {
                    wardenCasualties: report.wardenCasualties,
                    colonialCasualties: report.colonialCasualties,
                    totalEnlistments: report.totalEnlistments,
                    dayOfWar: report.dayOfWar,
                    etag: response.headers.get('etag')
                }
            });
        }

        return casualties.maps[map];
    }

    /**
     * @param {string} map Map ID you want data from.
     * 
     * Gets the dynamic map data for the provided map ID.
     * 
     * @returns Returns an object with the dynamic map data.
     */
    async getDynamicMapData(map) {
        const etag = Object.hasOwn(dynamic.maps, map.etag) ? data.maps[map].etag : '';
        const response = await fetch(`${this.rootURL}/worldconquest/maps/${map}/dynamic/public`, { headers: { 'If-None-Match': etag } });
        if (response.status === 200) {
                const report = await response.json();

                Object.assign(dynamic.maps, { [map]: {
                    regionId: report.regionId,
                    scorchedVictoryTowns: report.scorchedVictoryTowns,
                    version: report.version,
                    lastUpdated: report.lastUpdated,
                    mapItems: report.mapItems,
                    mapTextItems: report.mapTextItems,
                    etag: response.headers.get('etag')
                }});
            }
        
        return dynamic.maps[map];
    }

    /**
     * @param {string} map Map ID you want data from.
     * 
     * Gets the static map data for the provided map ID.
     * 
     * @returns Reutrns an object with the static map data.
     */
    async getStaticMapData(map) {
        const response = await fetch(`${this.rootURL}/worldconquest/maps/${map}/static`);
        const data = await response.json();

        return data;
    }

    //---------------------//
    // Convenience Methods //
    //---------------------//

    /**
     * Gets the war report for each map and sums up the casualties.
     * 
     * @returns Returns an object with the summed up casualties.
     */
    async getCasualties() {
        casualties.total.wardens = 0; casualties.total.colonials = 0; casualties.total.combined = 0;

        const maps = await this.getMaps()
        for (const map of maps) {
            await this.getWarReport(map);
        }

        for (const [key, value] of Object.entries(casualties.maps)) {
            casualties.total.wardens += value.wardenCasualties;
            casualties.total.colonials += value.colonialCasualties;
            casualties.total.combined += value.wardenCasualties + value.colonialCasualties;
        }

        return casualties.total;
    }
}

module.exports = FoxholeAPI;