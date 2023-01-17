import React from 'react';
import { FavouriteBirthday } from '../../models/Birthday';
import dayjs, { Dayjs } from 'dayjs';
import localeData from 'dayjs/plugin/localeData'
import StarIcon from '@mui/icons-material/Star';
dayjs.extend(localeData)
dayjs().localeData()



export default function BirthdaysOn(props: {
    time: Dayjs, favouriteBirthdays: FavouriteBirthday[],
    searchedName: string, setNewSearchedName: Function
}) {
    const time = props.time;
    const searchedName = props.searchedName;
    const setNewSearchedName = props.setNewSearchedName;

    const listItems = () => props.favouriteBirthdays.
        map((birthday) => {
            return (
                <div key={birthday.id}>
                    <StarIcon
                        color='action'
                    ></StarIcon>{birthday.name}
                </div>)
        })
    return (
        <div>
            <h3>Birthdays on {dayjs.months()[time.month()]} {time.date()}</h3>
            Search <input type="text" value={searchedName} onChange={(e) => {
                setNewSearchedName(e.target.value)
            }} />
            <div>
                {listItems()}
            </div>
        </div>
    );
}

