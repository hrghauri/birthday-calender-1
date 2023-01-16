
import { useState } from 'react';
import './App.css';
import MyDatePicker from './components/MyDatePicker/MyDatePicker';
import dayjs, { Dayjs } from 'dayjs';

function App() {
  const [date, setDate] = useState<Dayjs>(dayjs());
  return (
    <div className="App">
      <header className="App-header">
        <h1>My App</h1>
        <MyDatePicker
          date={date}
          setNewDate={setDate}
        ></MyDatePicker>
      </header>
    </div>
  );
}

export default App;
