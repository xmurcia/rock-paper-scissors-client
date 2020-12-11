import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

jest.mock('./io');

test('Renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText('Home');
  expect(linkElement).toBeInTheDocument();
});
