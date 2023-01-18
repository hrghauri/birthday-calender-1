import { DayBirthdayMap } from '../../models/Birthday';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData'
import './FavouritesList.css';
dayjs.extend(localeData)
dayjs().localeData()


export default function FavouritesList({ favoriteBirthdaysMap }: { favoriteBirthdaysMap: DayBirthdayMap }) {

    const listItems = () => Object.keys(favoriteBirthdaysMap)
        .filter((dayMonthKey: string) => {
            return favoriteBirthdaysMap[dayMonthKey].length > 0
        })
        .sort()
        .map((dayMonthKey: string) => {
            const birthdays = favoriteBirthdaysMap[dayMonthKey];
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

