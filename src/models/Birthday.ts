import dayjs, { Dayjs } from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
dayjs.extend(dayOfYear)

export interface Birthday {
    name: string,
    time: Dayjs,
}

export interface FavouriteBirthday extends Birthday {
    favourite: boolean
}

export type DayBirthdayMap = {
    [key: string]: Birthday[];
};

