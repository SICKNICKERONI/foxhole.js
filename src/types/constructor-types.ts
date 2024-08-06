export type RootURLs = {
    LIVE1: 'https://war-service-live.foxholeservices.com/api',
    LIVE2: 'https://war-service-live-2.foxholeservices.com/api',
    LIVE3: 'https://war-service-live-3.foxholeservices.com/api',
    DEV: 'https://war-service-dev.foxholeservices.com/api'
}

type Live1Strings = 'LIVE1' | 'ABLE'
type Live2Strings = 'LIVE2' | 'BAKER'
type Live3Strings = 'LIVE3' | 'CHARLIE'
type DevString = 'DEV'
export type ShardStrings = Live1Strings | Live2Strings | Live3Strings | DevString | null