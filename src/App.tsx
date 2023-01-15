
import React from 'react';
import './App.css';
import MyDatePicker from './MyDatePicker/MyDatePicker';
import dayjs, { Dayjs } from 'dayjs';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My App</h1>
        <MyDatePicker></MyDatePicker>
      </header>
    </div>
  );
}

export default App;
