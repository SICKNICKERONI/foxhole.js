class FoxholeAPI {
    
    /**
     * @param {string} shard The shard you want to get info from. (e.g 'LIVE1' or leave blank, 'LIVE2', 'LIVE3', or 'DEV')
     * 
     * Constructor for the FoxholeAPI class.
    */
   constructor(shard) {
       const lowerShard = shard ? shard.toLowerCase() : false;
       // Caching objects
       this.casualties = {
           maps: {},
           total: {
               wardens: 0,
               colonials: 0,        
               combined: 0
           }
       };
       this.dynamic = {
           maps: {}
       };
       this.state = {};
       this.maps = [];
       this.static = {};
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
                console.warn("Invalid shard! Defaulting to LIVE1/ABLE.");
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
        if (response.ok) {
            const data = await response.json();
            
            this.state = data;
            return data;
        }

        return this.state;
    }

    /**
     * Gets all the map IDs.
     * 
     * @returns Returns an array of all map IDs.
     */
    async getMaps() {
        const response = await fetch(`${this.rootURL}/worldconquest/maps`);
        if (response.ok) {
            const data = await response.json();
    
            this.maps = data;
            return data;
        }

        return this.maps;
    }

    /**
     * @param {string} map Map ID you want data from.
     * 
     * Gets the war report for the provided map ID.
     * 
     * @returns Returns an object with the war report data.
     */

    async getWarReport(map) {
        const etag = this.casualties.maps[map]?.etag ? this.casualties.maps[map].etag : '';
        const response = await fetch(`${this.rootURL}/worldconquest/warReport/${map}`, { headers: { 'If-None-Match': etag } });
        if (response.ok) {
            const report = await response.json();

            Object.assign(this.casualties.maps, {
                [map]: {
                    wardenCasualties: report.wardenCasualties,
                    colonialCasualties: report.colonialCasualties,
                    totalEnlistments: report.totalEnlistments,
                    dayOfWar: report.dayOfWar,
                    etag: response.headers.get('etag')
                }
            });

            return this.casualties.maps[map];
        }

        return this.casualties.maps[map];
    }

    /**
     * @param {string} map Map ID you want data from.
     * 
     * Gets the dynamic map data for the provided map ID.
     * 
     * @returns Returns an object with the dynamic map data.
     */
    async getDynamicMapData(map) {
        const etag = this.dynamic.maps[map]?.etag ? this.dynamic.maps[map].etag : '';
        const response = await fetch(`${this.rootURL}/worldconquest/maps/${map}/dynamic/public`, { headers: { 'If-None-Match': etag } });
        if (response.ok) {
                const report = await response.json();

                Object.assign(this.dynamic.maps, { [map]: {
                    regionId: report.regionId,
                    scorchedVictoryTowns: report.scorchedVictoryTowns,
                    version: report.version,
                    lastUpdated: report.lastUpdated,
                    mapItems: report.mapItems,
                    mapTextItems: report.mapTextItems,
                    etag: response.headers.get('etag')
                }});
            }
            
        return this.dynamic.maps[map];
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
        if (response.ok) {
            const data = await response.json();
            
            this.static = data;
            return data;
        }

        return this.static;
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
        this.casualties.total.wardens = 0; this.casualties.total.colonials = 0; this.casualties.total.combined = 0;

        const maps = await this.getMaps()
        for (const map of maps) {
            await this.getWarReport(map);
        }

        for (const [key, value] of Object.entries(this.casualties.maps)) {
            this.casualties.total.wardens += value.wardenCasualties;
            this.casualties.total.colonials += value.colonialCasualties;
            this.casualties.total.combined += value.wardenCasualties + value.colonialCasualties;
        }

        return this.casualties.total;
    }
}

module.exports = FoxholeAPI;