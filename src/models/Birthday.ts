import dayjs, { Dayjs } from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
dayjs.extend(dayOfYear)

export interface FavouriteBirthday {
    name: string,
    id: string,
    time: Dayjs,
    favourite: boolean
}

export type DayBirthdayMap = {
    [dayKey: string]: FavouriteBirthday[];
};

