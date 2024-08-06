import { MapDataResponse, WarReportResponse, WarStateResponse } from "./api-response-types"

// -----------------------
// War State
// -----------------------
export type CachedWarState = WarStateResponse;

// -----------------------
// Map IDs
// -----------------------
export type CachedMapIDs = string[];

// -----------------------
// Map Data
// -----------------------
export type CachedMapDataElement = MapDataResponse & { etag: string };
export type CachedMapData = {
    [key: string]: CachedMapDataElement
};

// -----------------------
// War Report
// -----------------------
export type CachedWarReportElement =  WarReportResponse & { etag: string };
export type CachedWarReports = {
    [key: string]: CachedWarReportElement
};