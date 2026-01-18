import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import PracticalExperienceForm from './PracticalExperienceForm';
import React from 'react';

describe('PracticalExperienceForm', () => {
  it('renders the form header', () => {
    render(<PracticalExperienceForm />);
    expect(
      screen.getByRole('heading', { name: /practical experience/i }),
    ).toBeInTheDocument();
  });

  it('renders input fields for Company Name, Position Title, and Date of Employment', () => {
    render(<PracticalExperienceForm />);
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/position title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of employment/i)).toBeInTheDocument();
  });

  it('displays the typed practical experience values', async () => {
    const user = userEvent.setup();
    render(<PracticalExperienceForm />);

    const companyNameInput = screen.getByLabelText(/company name/i);
    const positionInput = screen.getByLabelText(/position title/i);
    const dateInput = screen.getByLabelText(/date of employment/i);

    await user.type(companyNameInput, 'Google Inc.');
    await user.type(positionInput, 'Software Engineer');
    await user.type(dateInput, '2020-2023');

    expect(screen.getByText('Google Inc.')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('2020-2023')).toBeInTheDocument();
  });

  it('hides form inputs and shows only preview when Submit button is clicked', async () => {
    const user = userEvent.setup();
    render(<PracticalExperienceForm />);

    const companyNameInput = screen.getByLabelText(/company name/i);
    const positionInput = screen.getByLabelText(/position title/i);
    const dateInput = screen.getByLabelText(/date of employment/i);

    await user.type(companyNameInput, 'Google Inc.');
    await user.type(positionInput, 'Software Engineer');
    await user.type(dateInput, '2020-2023');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(screen.queryByLabelText(/company name/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/position title/i)).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(/date of employment/i),
    ).not.toBeInTheDocument();
    expect(screen.getByText('Google Inc.')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('2020-2023')).toBeInTheDocument();
  });

  it('shows Edit button in preview mode that returns to form inputs when clicked', async () => {
    const user = userEvent.setup();
    render(<PracticalExperienceForm />);

    const companyNameInput = screen.getByLabelText(/company name/i);
    await user.type(companyNameInput, 'Google Inc.');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);

    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/position title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of employment/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });
});
