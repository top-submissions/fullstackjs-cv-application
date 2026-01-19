import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import process from 'process';
import fs from 'fs';
import path from 'path';

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

  it('includes a responsive design media query in the CSS module', () => {
    const cssPath = path.join(process.cwd(), 'src', 'App.module.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    expect(cssContent).toMatch(/@media\s*\(max-width/);
  });

  it('renders a Print/Export button that triggers window.print', async () => {
    const user = userEvent.setup();
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});

    render(<App />);

    const printButton = screen.getByRole('button', {
      name: /print \/ export/i,
    });
    await user.click(printButton);

    expect(printSpy).toHaveBeenCalled();
    printSpy.mockRestore();
  });
});
