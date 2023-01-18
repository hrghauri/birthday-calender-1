import { Birthday } from '../../models/Birthday';
import dayjs, { Dayjs } from 'dayjs';
import localeData from 'dayjs/plugin/localeData'
import StarIcon from '@mui/icons-material/Star';
import './BirthdaysOn.css';
dayjs.extend(localeData)
dayjs().localeData()



export default function BirthdaysOn(
    { time, birthdays, searchedName, setNewSearchedName, setFavourite }: {
        time: Dayjs, birthdays: Birthday[],
        searchedName: string, setNewSearchedName: Function,
        setFavourite: Function
    }) {

    const listItems = () => birthdays
        .map((birthday) => {
            const className = birthday.favourite ?
                `myStar myStarId${birthday.id} isFavourite` :
                `myStar myStarId${birthday.id}`;
            return (
                <div key={birthday.id}>
                    <span className={className}>
                        <StarIcon
                            onClick={() => setFavourite({ ...birthday, favourite: !birthday.favourite })}
                            color={birthday.favourite ? 'primary' : 'action'}
                        />
                    </span>
                    {birthday.name}
                </div>
            )
        })
    return (
        <div>
            <h3>Birthdays on {dayjs.months()[time.month()]} {time.date()}</h3>
            Search Filter
            <input
                type="text"
                className='searchFilter'
                value={searchedName}
                onChange={(e) => { setNewSearchedName(e.target.value) }}
            />
            <button onClick={() => setNewSearchedName("")}>Clear Search Filter</button>
            <div>
                <br></br>
                {Boolean(searchedName) && <div><div>Results containing '{searchedName}':<br></br> </div>{listItems()}</div>}
                {!Boolean(searchedName) && listItems()}
            </div>
        </div>
    );
}

