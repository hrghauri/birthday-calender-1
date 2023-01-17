
import { useState, useEffect } from 'react';
import './App.css';
import MyDatePicker from './components/MyDatePicker/MyDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { Birthday, DayBirthdayMap } from './models/Birthday';
import BirthdaysOn from './components/BirthdaysOn/BirthdaysOn';
import FavouritesList from './components/FavouritesList/FavouritesList';


const BASE_URL = 'https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/';

function App() {
  const [time, setTime] = useState<Dayjs>(dayjs());
  const [searchedName, setSearchedName] = useState<string>('');
  const [birthdaysMap, setBirthdaysMap] = useState<DayBirthdayMap>({});

  useEffect(() => {
    const dayKey: string = getDayKey(time);
    // If we already have fetched for this date, we don't want to fetch again
    if (!birthdaysMap[dayKey]) {
      const controller = new AbortController();
      getBirthdaysOnFetchWithCancel(time, dayKey, controller);
      return () => {
        controller.abort();
      }
    }
  }, [time, birthdaysMap]);

  const getDayKey = (time: Dayjs) => {
    return time.format("YYYYMMDD")
  }

  const getBirthdaysOnFetchWithCancel = async (time: Dayjs, dayKey: string, controller: AbortController) => {
    let startId = 0;
    try {
      const month = time.month() + 1;
      const date = time.date();
      const resp = await fetch(BASE_URL + `${month}/${date}`, {
        signal: controller.signal
      });
      const results = await resp.json();
      let birthdays: Birthday[] = [];
      results.births.forEach((result: any) => {
        birthdays.push({
          name: result.text,
          time,
          id: dayKey + ',' + startId++,
          favourite: false
        });
      });
      setBirthdaysMap(prevVal => ({ ...prevVal, [dayKey]: birthdays }));
    } catch (err) {
      console.log(err);
    }
  };

  const loading = () => <p>Loading..</p>

  const getFavouriteBirthdays = (): Birthday[] => {
    return Object.values(birthdaysMap).flat().
      filter((birthday) => birthday.favourite === true)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Favourite Birthdays App</h1>
      </header>
      <FavouritesList
        favouriteBirthdays={getFavouriteBirthdays()}
      ></FavouritesList>
      <MyDatePicker
        time={time}
        setNewTime={setTime}
      ></MyDatePicker>
      {birthdaysMap[getDayKey(time)] &&
        <BirthdaysOn
          time={time}
          birthdays={
            searchedName ? birthdaysMap[getDayKey(time)].
              filter((birthday) => {
                return birthday.name.toLowerCase().includes(searchedName.toLocaleLowerCase())
              }) : birthdaysMap[getDayKey(time)]}
          searchedName={searchedName}
          setNewSearchedName={setSearchedName}
        ></BirthdaysOn>}
      {!birthdaysMap[getDayKey(time)] && loading()}
    </div>
  );
}

export default App;