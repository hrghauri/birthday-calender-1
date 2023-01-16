
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
  const [loading, setLoading] = useState<boolean>(false);
  const [favouritebirthdaysMap, setFavouriteBirthdaysMap] = useState<DayBirthdayMap>({});

  useEffect(() => {
    const dayKey: string = time.year() + '' + time.month() + '' + time.date();
    // If we already have fetched for this date, we don't want to fetch again
    if (!favouritebirthdaysMap[dayKey]) {
      const controller = new AbortController();
      getBirthdaysOnFetchWithCancel(time, dayKey, controller);
      return () => {
        controller.abort();
      }
    }
  }, [time, favouritebirthdaysMap]);


  const getBirthdaysOnFetchWithCancel = async (time: Dayjs, dayKey: string, controller: AbortController) => {
    setLoading(true)
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
          favourite: false
        });
      });
      setFavouriteBirthdaysMap(prevVal => ({ ...prevVal, [dayKey]: favouriteBirthdays }));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My App</h1>
        <MyDatePicker
          time={time}
          setNewTime={setTime}
        ></MyDatePicker>
        <BirthdaysOn
          time={time}
          favouritebirthdaysMap={favouritebirthdaysMap}
        ></BirthdaysOn>
      </header>
    </div>
  );
}

export default App;