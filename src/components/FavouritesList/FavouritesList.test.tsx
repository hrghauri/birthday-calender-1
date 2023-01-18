import { render, cleanup, screen } from '@testing-library/react';
import FavouritesList from './FavouritesList';
import { DayBirthdayMap } from '../../models/Birthday';

afterEach(cleanup);

describe('FavouritesList component', () => {
    test('should display the favourite birthdays', () => {
        const favoriteBirthdaysMap: DayBirthdayMap = {
            '0101': [
                { id: '0101,0', name: 'Daria Trubnikova, Russian rhythmic gymnast', favourite: true, time: null as any },
                { id: '0101,1', name: 'Jacky Ickx, Belgian racing driver', favourite: true, time: null as any },
            ],
            '0812': [
                { id: '0812,0', name: 'Bob Buhl, American baseball player (d. 2001)', favourite: true, time: null as any },
            ]
        };
        render(<FavouritesList favoriteBirthdaysMap={favoriteBirthdaysMap} />);

        const january1stBirthdays = screen.getByText(/January 1/i);
        expect(january1stBirthdays).toBeInTheDocument();

        const daria = screen.getByText(/Daria/i);
        expect(daria).toBeInTheDocument();
        const jacky = screen.getByText(/Jacky/i);
        expect(jacky).toBeInTheDocument();

        const august12thBirthdays = screen.getByText(/August 12/i);
        expect(august12thBirthdays).toBeInTheDocument();

        const bob = screen.getByText(/Bob/i);
        expect(bob).toBeInTheDocument();
    });

    test('should not should month with no birthdays', () => {
        const favoriteBirthdaysMap: DayBirthdayMap = {
            '0912': []
        };
        render(<FavouritesList favoriteBirthdaysMap={favoriteBirthdaysMap} />);
        expect(() => screen.getByText(/September 12/i)).toThrow();
    })
});
