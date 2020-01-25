export enum CacheTime {
    NextDay,
    Forever
}

export class CacheHelper {

    public static getCacheTime(cacheTime: CacheTime) {
        switch (cacheTime) {
            case CacheTime.NextDay:
                return this.nextDayTime();
            case CacheTime.Forever:
                return this.foreverCache();
        }
    }
    private static nextDayTime(): Date {
        const midnightTime = new Date();
        midnightTime.setHours(24, 0, 0, 0);
        return midnightTime;
    }


    private static foreverCache(): Date {
        const foreverCache = new Date(8640000000000000);
        return foreverCache;
    }



}