import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import React from 'react';
import { describe, it, expect } from 'vitest';

describe('App component', () => {
  it('renders the main page with project heading', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /cv application/i }),
    ).toBeInTheDocument();
  });

  it('renders the General Information form section', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /general information/i }),
    ).toBeInTheDocument();
  });

  it('renders the Educational Experience form section', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /educational experience/i }),
    ).toBeInTheDocument();
  });
});
