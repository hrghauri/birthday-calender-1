
import { useState, useEffect } from 'react';
import './App.css';
import MyDatePicker from './components/MyDatePicker/MyDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { FavouriteBirthday, DayBirthdayMap } from './models/Birthday';
import BirthdaysOn from './components/BirthdaysOn/BirthdaysOn';


const BASE_URL = 'https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/';

function App() {
  const [time, setTime] = useState<Dayjs>(dayjs());
  const [searchedName, setSearchedName] = useState<string>('');
  const [favouritebirthdaysMap, setFavouriteBirthdaysMap] = useState<DayBirthdayMap>({});

  useEffect(() => {
    const dayKey: string = getDayKey(time);
    // If we already have fetched for this date, we don't want to fetch again
    if (!favouritebirthdaysMap[dayKey]) {
      const controller = new AbortController();
      getBirthdaysOnFetchWithCancel(time, dayKey, controller);
      return () => {
        controller.abort();
      }
    } else {
      console.log(favouritebirthdaysMap[dayKey]);
    }
  }, [time, favouritebirthdaysMap]);

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
      let favouriteBirthdays: FavouriteBirthday[] = [];
      results.births.forEach((result: any) => {
        favouriteBirthdays.push({
          name: result.text,
          time,
          id: dayKey + ',' + startId++,
          favourite: false
        });
      });
      setFavouriteBirthdaysMap(prevVal => ({ ...prevVal, [dayKey]: favouriteBirthdays }));
    } catch (err) {
      console.log(err);
    }
  };

  const loading = () => <p>Loading..</p>

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Favourite Birthdays App</h1>
      </header>
      <MyDatePicker
        time={time}
        setNewTime={setTime}
      ></MyDatePicker>
      {favouritebirthdaysMap[getDayKey(time)] &&
        <BirthdaysOn
          time={time}
          favouriteBirthdays={
            searchedName ? favouritebirthdaysMap[getDayKey(time)].
              filter((birthday) => {
                return birthday.name.includes(searchedName)
              }) : favouritebirthdaysMap[getDayKey(time)]}
          searchedName={searchedName}
          setNewSearchedName={setSearchedName}
        ></BirthdaysOn>}
      {!favouritebirthdaysMap[getDayKey(time)] && loading()}
    </div>
  );
}

export default App;