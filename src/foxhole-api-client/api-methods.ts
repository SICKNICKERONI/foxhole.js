// -----------------------
// Types
// -----------------------
import { FoxholeAPIClient } from "./foxhole-api-client";
import { CachedWarState, CachedMapIDs, CachedWarReportElement, CachedMapDataElement } from "../types/cache-types";
import { WarStateResponse, MapIDsResponse, WarReportResponse, MapDataResponse } from "../types/api-response-types";

// -----------------------
// Utils
// -----------------------
import { isEmptyArray } from "../utils/methods";

/**
 * Gets the current state of the war.
 */
export async function getWarState(this: FoxholeAPIClient): Promise<CachedWarState | null> {
    const response = await fetch(`${this.rootURL}/worldconquest/war`);
    if (response.ok) {
        const warState: WarStateResponse = await response.json();

        this.warState = warState;
    }

    return this.warState.warId ? this.warState : null;
}

/**
 * Gets the IDs for all maps in the game.
 */
export async function getMapIDs(this: FoxholeAPIClient): Promise<CachedMapIDs | null> {
    if (!isEmptyArray(this.mapIDs)) return this.mapIDs; // Check cache first.

    const response = await fetch(`${this.rootURL}/worldconquest/maps`);
    if (response.ok) {
        const mapIDs: MapIDsResponse = await response.json();

        this.mapIDs = mapIDs;
    }

    return this.mapIDs ?? null;
}

/**
 * Gets the war report for the given map ID.
 * 
 * @param mapID The map ID you want data from.
 */
export async function getWarReport(this: FoxholeAPIClient, mapID: string): Promise<CachedWarReportElement | null> {
    const etag = this.warReports?.[mapID]?.etag ?? '';
    const response = await fetch(`${this.rootURL}/worldconquest/warReport/${mapID}`, { headers: { 'If-None-Match': etag } });
    if (response.ok) {
        const warReport: WarReportResponse = await response.json();

        const warReportElement: CachedWarReportElement = {
            ...warReport,
            etag: response.headers.get('etag') ?? ''
        }

        this.warReports[mapID] = warReportElement;
    }

    return this.warReports?.[mapID] ?? null;
}

/**
 * Gets map data for the given map ID.
 * 
 * @param mapID The map ID you want data from.
 * @param type The type of map data you want.
 */
export async function getMapData(this: FoxholeAPIClient, mapID: string, type: 'DYNAMIC' | 'STATIC') {
    let cacheType: 'dynamicMapData' | 'staticMapData'; // i only do this to make calls on this method more readable
    switch (type) {
        case 'DYNAMIC':
            cacheType = 'dynamicMapData';
            break;
        case 'STATIC':
            cacheType = 'staticMapData';
            break;
    }

    if (type === 'STATIC' && this.staticMapData?.[mapID]) return this.staticMapData[mapID]; // If requesting static and data is populated for the given map ID, return it. (Check cache first.)

    const endpoint = type === 'DYNAMIC' ? 'dynamic/public' : 'static';
    const etag = this?.[cacheType]?.[mapID]?.etag ?? '';
    const response = await fetch(`${this.rootURL}/worldconquest/maps/${mapID}/${endpoint}`, { headers: { 'If-None-Match': etag } });
    if (response.ok) {
        const mapData: MapDataResponse = await response.json();

        const mapDataElement: CachedMapDataElement = {
            ...mapData,
            etag: response.headers.get('etag') ?? ''
        };

        this[cacheType][mapID] = mapDataElement;
    }

    return this[cacheType]?.[mapID] ?? null;
}