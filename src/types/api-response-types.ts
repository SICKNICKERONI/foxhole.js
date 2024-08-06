// -----------------------
// Map Data
// -----------------------
export type MapItem = {
    teamId: string,
    iconType: number,
    x: number,
    y: number,
    flags: number,
    viewDirection?: number // this is optional purely because i have no idea what its use is and if it will be removed.
}
export type MapTextItem = {
    text: string,
    x: number,
    y: number,
    mapMarkerType: string
}
export type MapDataResponse = { // the api uses the same schema for everything that returns "map data" (just the dynamic and static endpoints)
    regionId: number,
    scorchedVictoryTowns: number,
    mapItems: MapItem[],
    mapTextItems: MapTextItem[],
    mapItemsC?: [], // no clue what map items c and w are, they've always been empty arrays :/
    mapItemsW?: [],
    lastUpdated: number,
    version: number
}

// -----------------------
// War State
// -----------------------
export type WarStateResponse = {
    warId: string,
    warNumber: number,
    winner: string,
    conquestStartTime: number | null,
    conquestEndTime: number | null,
    resistanceStartTime: number | null,
    requiredVictoryTowns: number
}

// -----------------------
// War Report
// -----------------------
export type WarReportResponse = {
    totalEnlistments: number,
    colonialCasualties: number,
    wardenCasualties: number,
    dayOfWar: number
}

// -----------------------
// Map IDs
// -----------------------
export type MapIDsResponse = string[]