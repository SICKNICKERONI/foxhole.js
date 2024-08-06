// -----------------------
// Types
// -----------------------
import { FoxholeAPIClient } from "./foxhole-api-client";
import { MapItem, MapTextItem } from "../types/api-response-types";
import { CasualtyData, MapItemAndText, ClaimedVictoryTownData, MapFlags } from "../types/return-types";
import { MapTextFromMapItemFilter } from "../types/misc-types";

// -----------------------
// Utils
// -----------------------
import { Vector2 } from "../utils/vector2";

// -----------------------
// Casualty Methods
// -----------------------
/**
 * Gets the casualties for the given map ID.
 * 
 * @param mapID The map ID you want data from.
 */
export async function getCasualties(this: FoxholeAPIClient, mapID: string): Promise <CasualtyData | null> {
    const warReport = await this.getWarReport(mapID);
    if(!warReport) return null;

    return { wardens: warReport.wardenCasualties, colonials: warReport.colonialCasualties, combined: warReport.wardenCasualties + warReport.colonialCasualties }
}

/**
 * Gets the total casualties across all maps.
 */
export async function getTotalCasualties(this: FoxholeAPIClient): Promise <CasualtyData | null> {
    const mapIDs = await this.getMapIDs();
    if(!mapIDs) return null;

    const promises = mapIDs.map(async (mapID) => {
        const casualties = await this.getCasualties(mapID);
        return casualties ?? { wardens: 0, colonials: 0 }
    });
    const results = await Promise.all(promises);

    let wardens = 0;
    let colonials = 0;
    let combined = 0;
    results.forEach((result) => {
        wardens += result.wardens;
        colonials += result.colonials;
    });
    combined = wardens + colonials;

    return { wardens, colonials, combined }
}

// -----------------------
// Victory Town Methods
// -----------------------
/**
 * Gets the victory town in the given map ID.
 * 
 * @param mapID The map ID you want data from.
 */
export async function getVictoryTown(this: FoxholeAPIClient, mapID: string): Promise <MapItemAndText | null> {
    const dynamicMapData = await this.getMapData(mapID, 'DYNAMIC');
    if(!dynamicMapData) return null;

    const mapItem = dynamicMapData.mapItems.find((item) => {
        const flags = readMapItemFlags(item);
        return flags.isVictoryBase;
    });
    if(!mapItem) return null;

    const staticMapData = await this.getMapData(mapID, 'STATIC');
    if(!staticMapData) return null;

    const mapTextItem = await this.getMapTextItemForMapItem(mapID, mapItem, { mapMarkerType: 'MAJOR' });
    if(!mapTextItem) return null;

    return { mapItem, mapTextItem };
}

/**
 * Gets every victory town across all maps.
 */
export async function getAllVictoryTowns(this: FoxholeAPIClient): Promise <MapItemAndText[] | null> {
    const mapIDs = await this.getMapIDs();
    if(!mapIDs) return null;

    const promises = mapIDs.map(async (mapID) => {
        const victoryTown = await this.getVictoryTown(mapID);
        if (!victoryTown) return null;

        return victoryTown;
    });
    const results = await Promise.all(promises);

    const victoryTownArray: MapItemAndText[] = [];
    results.forEach((victoryTown) => {
        if (!victoryTown) return;

        victoryTownArray.push(victoryTown);
    })

    return victoryTownArray;
}

/**
 * Gets the true amount of required victory towns to win the war.
 * (The field in the war state is static, use this method for an accurate number.)
*/
export async function getTrueRequiredVictoryTowns(this: FoxholeAPIClient): Promise <number | null> {
    const state = await this.getWarState();
    if(!state) return null;

    const victoryTowns = await this.getAllVictoryTowns();
    if(!victoryTowns) return null;

    const scorchedVictoryTowns = victoryTowns.filter((victoryTown) => readMapItemFlags(victoryTown.mapItem).isScorched);

    return state.requiredVictoryTowns - scorchedVictoryTowns.length;
}

/**
 * Gets the number of victory towns each team owns.
*/
export async function getClaimedVictoryTowns(this: FoxholeAPIClient): Promise <ClaimedVictoryTownData | null> {
    const victoryTowns = await this.getAllVictoryTowns();
    if(!victoryTowns) return null;

    const claimedVictoryTowns = victoryTowns.filter((victoryTown) => {
        const flags = readMapItemFlags(victoryTown.mapItem);
        return flags.isTownClaimed;
    })

    let wardens = 0;
    let colonials = 0;
    claimedVictoryTowns.forEach((claimedVictoryTown) => {
        if (!claimedVictoryTown) return;

        switch (claimedVictoryTown.mapItem.teamId) {
            case 'WARDENS':
                wardens++;
                break;
            case 'COLONIALS':
                colonials++
                break;
        }
    });

    return { wardens, colonials };
}

// -----------------------
// Miscellaneous Methods
// -----------------------
/**
 * Gets a map text item given a map item.
 * 
 * @param mapID The map ID associated with the map item. (Inputting a different map ID than the one associated with the map item will give you a map text item in a different map.)
 * @param mapItem The map item you want the map text item for.
 * @param filters Optional filters used to sort between things like farthest map text item and map marker type.
*/
export async function getMapTextItemForMapItem(this: FoxholeAPIClient, mapID: string, mapItem: MapItem, filters ?: MapTextFromMapItemFilter): Promise <MapTextItem | null> {
    const staticMapData = await this.getMapData(mapID, 'STATIC');
    if(!staticMapData) return null;

    const mapItemVector = new Vector2(mapItem.x, mapItem.y);
    const filtersArray: ((item: MapTextItem) => boolean)[] =[];

    if (filters?.mapMarkerType) {
        filtersArray.push((item) => item.mapMarkerType.toLowerCase() === filters.mapMarkerType?.toLowerCase());
    }

    const filteredItems = staticMapData.mapTextItems.filter((item) => filtersArray.every(filter => filter(item)));

    filteredItems.sort((a, b) => {
        const aDistance = mapItemVector.distanceTo(new Vector2(a.x, a.y));
        const bDistance = mapItemVector.distanceTo(new Vector2(b.x, b.y));

        return filters?.farthest ? bDistance - aDistance : aDistance - bDistance;
    })

    return filteredItems[0];
}

/**
 * Processess the flags value of a map item.
 * 
 * @param mapItem The map item you want to read the flags of. 
 */
export function readMapItemFlags(mapItem: MapItem): MapFlags {
    const flags = mapItem.flags;
    return {
        isVictoryBase: flags & 0x01 ? true : false,
        isBuildSite: flags & 0x04 ? true : false,
        isScorched: flags & 0x10 ? true : false,
        isTownClaimed: flags & 0x20 ? true : false
    }
}
