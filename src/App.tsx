
import { useState, useEffect } from 'react';
import './App.css';
import MyDatePicker from './components/MyDatePicker/MyDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { FavouriteBirthday, DayBirthdayMap } from './models/Birthday';


const BASE_URL = 'https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/';

function App() {
  const [time, setTime] = useState<Dayjs>(dayjs());
  const [searchedName, setSearchedName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [favouritebirthdaysMap, setFavouriteBirthdaysMap] = useState<DayBirthdayMap>({});



  useEffect(() => {
    console.log(favouritebirthdaysMap);
    const dayKey: string = time.year() + '' + time.month() + '' + time.date();
    if (!favouritebirthdaysMap[dayKey]) {
      const fetchPromise = getBirthdaysOnFetchWithCancel(time, dayKey);
      return () => {
        fetchPromise.controller.abort();
      }
    }
  }, [time]);


  const getBirthdaysOnFetchWithCancel = (time: Dayjs, dayKey: string) => {
    setLoading(true)
    const controller = new AbortController();
    const signal = controller.signal;
    const month = time.month() + 1;
    const date = time.date();
    const fetchPromise: any = fetch(BASE_URL + `${month}/${date}`, {
      signal: signal
    })
      .then((resp) => resp.json())
      .then(results => {
        let birthdays: FavouriteBirthday[] = [];
        results.births.forEach((result: any) => {
          birthdays.push({
            name: result.text,
            time,
            favourite: false
          })
        })
        setFavouriteBirthdaysMap({ ...favouritebirthdaysMap, [dayKey]: birthdays })
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoading(false);
      });
    fetchPromise.controller = controller;
    return fetchPromise;
  }



  return (
    <div className="App">
      <header className="App-header">
        <h1>My App</h1>
        <MyDatePicker
          time={time}
          setNewTime={setTime}
        ></MyDatePicker>
      </header>
    </div>
  );
}

export default App;