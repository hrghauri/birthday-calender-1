import React from 'react';
import { FavouriteBirthday, DayBirthdayMap } from '../../models/Birthday';
import dayjs, { Dayjs } from 'dayjs';
import localeData from 'dayjs/plugin/localeData'
import StarIcon from '@mui/icons-material/Star';
dayjs.extend(localeData)
dayjs().localeData()



export default function BirthdaysOn(props: { time: Dayjs, favouritebirthdaysMap: DayBirthdayMap }) {
    const time = props.time;
    const dayKey: string = time.year() + '' + time.month() + '' + time.date();

    const listItems = () => props.favouritebirthdaysMap[dayKey].
        map((birthday, index) => {
            return (
                <li key={index}>
                    {birthday.name}
                </li>)
        })

    const loading = () => <p>Loading..</p>

    return (
        <div>
            <h3>Birthdays on {dayjs.months()[time.month()]} {time.date()}</h3>
            <ul>
                {props.favouritebirthdaysMap[dayKey] && listItems()}
                {!props.favouritebirthdaysMap[dayKey] && loading()}
            </ul>
        </div>


    );
}

