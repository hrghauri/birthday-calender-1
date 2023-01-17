import { Dayjs } from 'dayjs';

export interface Birthday {
    name: string,
    id: string,
    time: Dayjs,
    favourite: boolean
}

export type DayBirthdayMap = {
    [dayKey: string]: Birthday[];
};

