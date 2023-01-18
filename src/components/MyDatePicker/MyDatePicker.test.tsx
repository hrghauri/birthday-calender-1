import { render, cleanup, screen } from '@testing-library/react';
import MyDatePicker from './MyDatePicker';
import dayjs from 'dayjs';

afterEach(cleanup);

describe('MyDatePicker component', () => {
    let setNewTime: jest.Mock;
    let time: dayjs.Dayjs;
    beforeEach(() => {
        time = dayjs();
        setNewTime = jest.fn();
    });
    test('renders Date Picker', () => {
        render(<MyDatePicker setNewTime={setNewTime} time={time} />);
        const linkElement = screen.getByText(/Date Picker/i);
        expect(linkElement).toBeInTheDocument();
    });
});