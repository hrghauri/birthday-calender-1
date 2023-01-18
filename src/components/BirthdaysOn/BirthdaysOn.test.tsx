import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import BirthdaysOn from './BirthdaysOn';
import { Birthday } from '../../models/Birthday';
import dayjs from 'dayjs';

afterEach(cleanup);

describe('BirthdaysOn component', () => {
    let setNewSearchedName: jest.Mock;
    let setFavourite: jest.Mock;
    let time: dayjs.Dayjs;
    let birthdays: Birthday[];
    beforeEach(() => {
        time = dayjs('2023-01-18');
        birthdays = [
            { id: '0118,0', name: 'Daria Trubnikova, Russian rhythmic gymnast', favourite: true, time: null as any },
            { id: '0118,1', name: 'Jacky Ickx, Belgian racing driver', favourite: true, time: null as any },
        ];
        setNewSearchedName = jest.fn();
        setFavourite = jest.fn();
    });

    test('should setFavourite when a star icon is clicked', () => {
        const { container } = render(
            <BirthdaysOn
                time={time}
                birthdays={birthdays}
                searchedName=""
                setNewSearchedName={setNewSearchedName}
                setFavourite={setFavourite}
            />
        );
        const star = container.getElementsByClassName(`myStarId${birthdays[0].id}`);
        fireEvent.click(star[0].children[0]);

        expect(setFavourite).toHaveBeenCalled();
        expect(setFavourite).toHaveBeenCalledWith({ ...birthdays[0], favourite: !birthdays[0].favourite });
    });

    test('should set searchedName when search filter is  changed', () => {
        const setNewSearchedName = jest.fn();
        const setFavourite = jest.fn();
        const { container } = render(
            <BirthdaysOn
                time={time}
                birthdays={birthdays}
                searchedName=""
                setNewSearchedName={setNewSearchedName}
                setFavourite={setFavourite}
            />
        );
        const input = container.getElementsByClassName('searchFilter');
        fireEvent.change(input[0], { target: { value: 'harry' } });
        expect(setNewSearchedName).toHaveBeenCalledWith('harry');
    });

})