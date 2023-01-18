import { Birthday } from '../../models/Birthday';
import dayjs, { Dayjs } from 'dayjs';
import localeData from 'dayjs/plugin/localeData'
import StarIcon from '@mui/icons-material/Star';
import './BirthdaysOn.css';
dayjs.extend(localeData)
dayjs().localeData()



export default function BirthdaysOn(props: {
    time: Dayjs, birthdays: Birthday[],
    searchedName: string, setNewSearchedName: Function,
    setFavourite: Function
}) {
    const time = props.time;
    const searchedName = props.searchedName;
    const birthdays = props.birthdays;
    const setNewSearchedName = props.setNewSearchedName;
    const setFavourite = props.setFavourite;


    const listItems = () => birthdays.
        map((birthday) => {
            return (
                <div key={birthday.id}>
                    {!birthday.favourite && <span className='myStar'><StarIcon onClick={() => setFavourite({ ...birthday, favourite: true })}
                        color='action'
                    ></StarIcon></span>}
                    {birthday.favourite && <span className='myStar'><StarIcon onClick={() => setFavourite({ ...birthday, favourite: false })}
                        color='primary'
                    ></StarIcon></span>}
                    {birthday.name}
                </div>)
        })
    return (
        <div>
            <h3>Birthdays on {dayjs.months()[time.month()]} {time.date()}</h3>
            Search Filter <input type="text" value={searchedName} onChange={(e) => {
                setNewSearchedName(e.target.value)
            }} /> <button onClick={() => setNewSearchedName("")}>Clear Search Filter</button>
            <div>
                <br></br>
                {Boolean(searchedName) && <div><div>Results containing '{searchedName}':<br></br> </div>{listItems()}</div>}
                {!Boolean(searchedName) && listItems()}
            </div>
        </div>
    );
}

