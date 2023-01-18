import React from 'react';
import { DayBirthdayMap } from '../../models/Birthday';
import dayjs, { Dayjs } from 'dayjs';
import localeData from 'dayjs/plugin/localeData'
dayjs.extend(localeData)
dayjs().localeData()


export default function FavouritesList(props: { favoriteBirthdaysMap: DayBirthdayMap }) {
    const favouriteBirthdays = props.favoriteBirthdaysMap;

    const listItems = () => Object.keys(favouriteBirthdays)
        .filter((dayMonthKey: string) => {
            return favouriteBirthdays[dayMonthKey].length > 0
        })
        .sort()
        .map((dayMonthKey: string) => {
            const birthdays = favouriteBirthdays[dayMonthKey];
            return (
                <div key={dayMonthKey}>
                    {dayjs.months()[Number((dayMonthKey).substring(0, 2)) - 1]} {[Number((dayMonthKey).substring(2, 4))]}
                    {birthdays.map(birthday => {
                        return <div key={birthday.id}>{birthday.name}</div>
                    })}
                    <br></br>
                </div>
            )
        })

    return (
        <div>
            <h2>Favourite Birthdays</h2>
            {listItems()}
        </div>
    );
}

