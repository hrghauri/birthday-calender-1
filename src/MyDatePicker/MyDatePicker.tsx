import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

export default function MyDatePicker(props: any) {

    return (

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
                displayStaticWrapperAs='desktop'
                openTo='year'
                value='2023'
                onChange={(newValue) => {
                    console.log(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}