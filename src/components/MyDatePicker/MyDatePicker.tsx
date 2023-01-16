import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs, { Dayjs } from 'dayjs';


export default function MyDatePicker(props: any) {
    const time: Dayjs = props.time;
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
                disableHighlightToday={true}
                displayStaticWrapperAs='desktop'
                openTo='day'
                value={time}
                onChange={(newTime) => {
                    props.setNewTime(newTime)
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}