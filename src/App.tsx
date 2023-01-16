
import { useState, useEffect } from 'react';
import './App.css';
import MyDatePicker from './components/MyDatePicker/MyDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { Birthday, FavouriteBirthday } from './models/Birthday';


const BASE_URL = 'https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/';

function App() {
  const [time, setTime] = useState<Dayjs>(dayjs());
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [searchedName, setSearchedName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);



  useEffect(() => {
    const fetchPromise = getBirthdaysOnFetchWithCancel(time);
    return () => {
      fetchPromise.controller.abort();
    }
  }, [time]);


  const getBirthdaysOnFetchWithCancel = (time: Dayjs) => {
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
        let birthdays: Birthday[] = [];
        results.births.forEach((result: any) => {
          birthdays.push({
            name: result.text,
            time
          })
        })
        console.log(birthdays);
        setBirthdays(birthdays);
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