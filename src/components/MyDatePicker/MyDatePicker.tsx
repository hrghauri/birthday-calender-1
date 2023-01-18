import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Dayjs } from 'dayjs';
import './MyDatePicker.css';


export default function MyDatePicker({ time, setNewTime }: { time: Dayjs, setNewTime: Function }) {

    return (<div>
        Date Picker
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
                disableHighlightToday={true}
                displayStaticWrapperAs='desktop'
                openTo='day'
                value={time}
                onChange={(newTime) => {
                    setNewTime(newTime)
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    </div>
    );
}