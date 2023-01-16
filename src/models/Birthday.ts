import dayjs, { Dayjs } from 'dayjs';

export interface Birthday {
    name: string,
    time: Dayjs
}

export interface FavouriteBirthday extends Birthday {
    favourite: boolean
}