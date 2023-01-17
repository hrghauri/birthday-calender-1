import { Dayjs } from 'dayjs';

export interface FavouriteBirthday {
    name: string,
    id: string,
    time: Dayjs,
    favourite: boolean
}

export type DayBirthdayMap = {
    [dayKey: string]: FavouriteBirthday[];
};

