// -----------------------
// Methods
// -----------------------
import { getWarState, getMapIDs, getWarReport, getMapData } from './api-methods';
import { getCasualties, getTotalCasualties, getVictoryTown, getAllVictoryTowns, getTrueRequiredVictoryTowns, getClaimedVictoryTowns, getMapTextItemForMapItem, readMapItemFlags } from './helper-methods';

// -----------------------
// Types
// -----------------------
import { CachedMapData, CachedWarState, CachedWarReports, CachedMapIDs } from '../types/cache-types';
import { RootURLs, ShardStrings } from '../types/constructor-types';

// -----------------------
// Constants
// -----------------------
const rootURLs: RootURLs = {
    LIVE1: 'https://war-service-live.foxholeservices.com/api',
    LIVE2: 'https://war-service-live-2.foxholeservices.com/api',
    LIVE3: 'https://war-service-live-3.foxholeservices.com/api',
    DEV: 'https://war-service-dev.foxholeservices.com/api'
} as const;

// -----------------------
// Class
// -----------------------
export class FoxholeAPIClient {
    // -----------------------
    // Properties
    // -----------------------
    rootURL: string;
    dynamicMapData: CachedMapData;
    staticMapData: CachedMapData;
    warState: CachedWarState;
    warReports: CachedWarReports;
    mapIDs: CachedMapIDs;

    /**
     * Instances a new API client for a given shard.
     * 
     * @param shard The shard / war you want to interact with. If left undefined, it will default to LIVE1 / ABLE.
     */
    constructor(shard?: ShardStrings) {
        // Initialize Caching
        this.dynamicMapData = {};
        this.staticMapData = {};
        this.warState = {
            warId: '',
            warNumber: 0,
            winner: '',
            conquestStartTime: null,
            conquestEndTime: null,
            resistanceStartTime: null,
            requiredVictoryTowns: 0
        };
        this.warReports = {};
        this.mapIDs = [];

        // Root URL
        const lowerShard = shard ? shard.toLowerCase() : null;
        switch (lowerShard) {
            case 'able':
            case 'live1':
                this.rootURL = rootURLs.LIVE1;
                break;

            case 'baker':
            case 'live2':
                this.rootURL = rootURLs.LIVE2;
                break;

            case 'charlie':
            case 'live3':
                this.rootURL = rootURLs.LIVE3;
                break;

            case 'dev':
                this.rootURL = rootURLs.DEV;
                break;

            default:
                this.rootURL = rootURLs.LIVE1;
                break;
        }

        // -----------------------
        // Bind API Methods
        // -----------------------
        this.getWarState = getWarState.bind(this);
        this.getMapIDs = getMapIDs.bind(this);
        this.getWarReport = getWarReport.bind(this);
        this.getMapData = getMapData.bind(this);

        // -----------------------
        // Bind Helper Methods
        // -----------------------
        this.getCasualties = getCasualties.bind(this);
        this.getTotalCasualties = getTotalCasualties.bind(this);
        this.getVictoryTown = getVictoryTown.bind(this);
        this.getAllVictoryTowns = getAllVictoryTowns.bind(this);
        this.getTrueRequiredVictoryTowns = getTrueRequiredVictoryTowns.bind(this);
        this.getClaimedVictoryTowns = getClaimedVictoryTowns.bind(this);
        this.getMapTextItemForMapItem = getMapTextItemForMapItem.bind(this);
    }

    // -----------------------
    // API Methods
    // -----------------------
    getWarState: typeof getWarState;
    getMapIDs: typeof getMapIDs;
    getWarReport: typeof getWarReport;
    getMapData: typeof getMapData;

    // -----------------------
    // Helper Methods
    // -----------------------
    getCasualties: typeof getCasualties;
    getTotalCasualties: typeof getTotalCasualties;
    getVictoryTown: typeof getVictoryTown;
    getAllVictoryTowns: typeof getAllVictoryTowns;
    getTrueRequiredVictoryTowns: typeof getTrueRequiredVictoryTowns;
    getClaimedVictoryTowns: typeof getClaimedVictoryTowns;
    getMapTextItemForMapItem: typeof getMapTextItemForMapItem;

    // -----------------------
    // Static Methods
    // -----------------------
    static readMapItemFlags = readMapItemFlags;
}