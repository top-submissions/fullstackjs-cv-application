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
    await user.type(dateInput, '2020-10-01');

    expect(screen.getByText('Google Inc.')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('2020-10-01')).toBeInTheDocument();
  });

  it('hides form inputs and shows only preview when Submit button is clicked', async () => {
    const user = userEvent.setup();
    render(<PracticalExperienceForm />);

    const companyNameInput = screen.getByLabelText(/company name/i);
    const positionInput = screen.getByLabelText(/position title/i);
    const dateInput = screen.getByLabelText(/date of employment/i);

    await user.type(companyNameInput, 'Google Inc.');
    await user.type(positionInput, 'Software Engineer');
    await user.type(dateInput, '2020-10-01');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(screen.queryByLabelText(/company name/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/position title/i)).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(/date of employment/i),
    ).not.toBeInTheDocument();
    expect(screen.getByText('Google Inc.')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('2020-10-01')).toBeInTheDocument();
  });

  it('shows Edit button in preview mode that returns to form inputs when clicked', async () => {
    const user = userEvent.setup();
    render(<PracticalExperienceForm />);

    const companyNameInput = screen.getByLabelText(/company name/i);
    await user.type(companyNameInput, 'Google Inc.');
    const positionInput = screen.getByLabelText(/position title/i);
    await user.type(positionInput, 'Software Engineer');
    const dateInput = screen.getByLabelText(/date of employment/i);
    await user.type(dateInput, '2020-10-01');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);

    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/position title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of employment/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('allows adding multiple practical experience entries', async () => {
    const user = userEvent.setup();
    render(<PracticalExperienceForm />);

    const companyNameInput = screen.getByLabelText(/company name/i);
    await user.type(companyNameInput, 'Google Inc.');
    const positionInput = screen.getByLabelText(/position title/i);
    await user.type(positionInput, 'Software Engineer');
    const dateInput = screen.getByLabelText(/date of employment/i);
    await user.type(dateInput, '2020-10-01');
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    const addButton = screen.getByRole('button', { name: /add/i });
    await user.click(addButton);

    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/position title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of employment/i)).toBeInTheDocument();

    expect(screen.getByText('Google Inc.')).toBeInTheDocument();
  });

  it('allows deleting individual practical experience entries', async () => {
    const user = userEvent.setup();
    render(<PracticalExperienceForm />);

    // Create and submit first entry
    const companyNameInput = screen.getByLabelText(/company name/i);
    await user.type(companyNameInput, 'Google Inc.');
    const positionInput = screen.getByLabelText(/position title/i);
    await user.type(positionInput, 'Software Engineer');
    const dateInput = screen.getByLabelText(/date of employment/i);
    await user.type(dateInput, '2020-10-01');
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    // Create and submit second entry
    const addButton = screen.getByRole('button', { name: /add/i });
    await user.click(addButton);
    const companyNameInput2 = screen.getByLabelText(/company name/i);
    await user.type(companyNameInput2, 'Microsoft');
    const positionInput2 = screen.getByLabelText(/position title/i);
    await user.type(positionInput2, 'Senior Engineer');
    const dateInput2 = screen.getByLabelText(/date of employment/i);
    await user.type(dateInput2, '2023-01-01');
    const submitButton2 = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton2);

    // Verify both entries exist
    expect(screen.getByText('Google Inc.')).toBeInTheDocument();
    expect(screen.getByText('Microsoft')).toBeInTheDocument();

    // Delete first entry
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    await user.click(deleteButtons[0]);

    // Verify first entry is removed and second entry remains
    expect(screen.queryByText('Google Inc.')).not.toBeInTheDocument();
    expect(screen.getByText('Microsoft')).toBeInTheDocument();
  });

  it('prevents submission when required fields are empty', async () => {
    const user = userEvent.setup();
    render(<PracticalExperienceForm />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/position title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of employment/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('prevents submission when date format is invalid', async () => {
    const user = userEvent.setup();
    render(<PracticalExperienceForm />);

    const companyNameInput = screen.getByLabelText(/company name/i);
    await user.type(companyNameInput, 'Google Inc.');
    const positionInput = screen.getByLabelText(/position title/i);
    await user.type(positionInput, 'Software Engineer');

    const dateInput = screen.getByLabelText(/date of employment/i);
    await user.type(dateInput, 'invalid-date');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
  });

  it('wraps form inputs in a container with "formContainer" class for styling', () => {
    render(<PracticalExperienceForm />);

    const companyNameInput = screen.getByLabelText(/company name/i);
    const container = companyNameInput.closest('div');

    expect(container.className).toMatch(/formContainer/);
  });

  it('applies specific styling classes to action buttons (Add, Edit, Delete)', async () => {
    const user = userEvent.setup();
    render(<PracticalExperienceForm />);

    const addButton = screen.getByRole('button', { name: /add/i });
    expect(addButton.className).toMatch(/addButton/);

    const companyNameInput = screen.getByLabelText(/company name/i);
    await user.type(companyNameInput, 'Google Inc.');
    const positionInput = screen.getByLabelText(/position title/i);
    await user.type(positionInput, 'Software Engineer');
    const dateInput = screen.getByLabelText(/date of employment/i);
    await user.type(dateInput, '2020-10-01');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    const editButton = screen.getByRole('button', { name: /edit/i });
    const deleteButton = screen.getByRole('button', { name: /delete/i });

    expect(editButton.className).toMatch(/editButton/);
    expect(deleteButton.className).toMatch(/deleteButton/);
  });
});
