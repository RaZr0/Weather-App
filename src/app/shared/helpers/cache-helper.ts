export enum CacheTime {
    NextDay
}

export class CacheHelper {

    public static getCacheTimeInSeconds(cacheTime: CacheTime) {
        switch (cacheTime) {
            case CacheTime.NextDay:
                return this.nextDayTime();
        }
    }

    private static nextDayTime(): number {
        const midnightTime = new Date();
        midnightTime.setHours(24, 0, 0, 0);
        return (midnightTime.getTime() - new Date().getTime()) / 1000;
    }
}