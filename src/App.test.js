import { render, screen } from '@testing-library/react';
import Gist from './components/Gist';

test('renders Gist List', async() => {
  render(<Gist />);
  expect(screen.getByText(/Gist List/i)).toBeInTheDocument();
});
