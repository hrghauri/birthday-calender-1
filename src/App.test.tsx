import { render, screen, cleanup } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

test('renders My App', () => {
  render(<App />);
  const linkElement = screen.getByText(/My Favourite Birthdays App/i);
  expect(linkElement).toBeInTheDocument();
});
