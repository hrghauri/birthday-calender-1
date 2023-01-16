import React from 'react';
import { FavouriteBirthday, DayBirthdayMap } from '../../models/Birthday';
import dayjs, { Dayjs } from 'dayjs';
import localeData from 'dayjs/plugin/localeData'
dayjs.extend(localeData)
dayjs().localeData()



export default function BirthdaysOn(props: { time: Dayjs }) {
    const time = props.time;
    return (
        <div>
            <h3>Birthdays on {dayjs.months()[time.month()]} {time.date()}</h3>
        </div>
    );
}

