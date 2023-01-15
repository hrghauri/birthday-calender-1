// import React from 'react';

// function Calender(props: any) {
//     return (
//         <div>

//         </div>
//     );
// }

// export default Calender;

import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

export default function MyDatePicker(props: any) {
    // const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-07'));
    console.log(dayjs().year());


    return (
        // <LocalizationProvider dateAdapter={AdapterDayjs}>
        //     <DatePicker
        //         label="Basic example"
        //          openTo="year"
        //         value={props}
        //         onChange={(newValue) => {
        //             console.log(newValue);
        //         }}
        //         renderInput={(params: any) => <TextField {...params} />}
        //     />
        // </LocalizationProvider>
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