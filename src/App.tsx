
import { useState, useEffect } from 'react';
import './App.css';
import MyDatePicker from './components/MyDatePicker/MyDatePicker';
import dayjs, { Dayjs } from 'dayjs';


const BASE_URL = 'https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/birth/';

function App() {
  const [time, setTime] = useState<Dayjs>(dayjs());


  useEffect(() => {
    console.log(time)
  }, [time]);

  const getBirthdaysOnDay = (month: number, date: number) => {

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
