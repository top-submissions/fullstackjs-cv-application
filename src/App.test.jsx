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

  it('renders the Practical Experience section', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /practical experience/i }),
    ).toBeInTheDocument();
  });

  it('renders a main layout container with "appContainer" class', () => {
    render(<App />);

    const heading = screen.getByRole('heading', { name: /cv application/i });
    const layoutContainer = heading.parentElement;

    expect(layoutContainer.className).toMatch(/appContainer/);
  });

  it('renders the application title with "headerTitle" class for styling', () => {
    render(<App />);

    const heading = screen.getByRole('heading', { name: /cv application/i });

    expect(heading.className).toMatch(/headerTitle/);
  });
});
