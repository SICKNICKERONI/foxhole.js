import { MapItem, MapTextItem } from "./api-response-types";

export type CasualtyData = {
    wardens: number,
    colonials: number,
    combined: number
};

export type ClaimedVictoryTownData = {
    wardens: number,
    colonials: number
};

export type MapFlags = {
    isVictoryBase: boolean,
    isBuildSite: boolean,
    isScorched: boolean,
    isTownClaimed: boolean
}

export type MapItemAndText = {
    mapItem: MapItem,
    mapTextItem: MapTextItem
};