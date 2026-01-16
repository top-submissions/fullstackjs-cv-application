import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import { describe, it, expect } from 'vitest';

describe('App component', () => {
  it('renders the main page with a heading', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /cv application/i })
    ).toBeInTheDocument();
  });

  it('renders the General Information section', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /general information/i })
    ).toBeInTheDocument();
  });
});
