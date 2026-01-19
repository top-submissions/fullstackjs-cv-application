import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import EducationalExperienceForm from './EducationalExperienceForm';
import React from 'react';

describe('EducationalExperienceForm', () => {
  it('renders the form header', () => {
    render(<EducationalExperienceForm />);
    expect(
      screen.getByRole('heading', { name: /educational experience/i }),
    ).toBeInTheDocument();
  });

  it('renders input fields for School Name, Title of Study, and Date of Study', () => {
    render(<EducationalExperienceForm />);
    expect(screen.getByLabelText(/school name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/title of study/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of study/i)).toBeInTheDocument();
  });

  it('displays the typed input field values', async () => {
    const user = userEvent.setup();
    render(<EducationalExperienceForm />);

    const schoolNameInput = screen.getByLabelText(/school name/i);
    const titleInput = screen.getByLabelText(/title of study/i);
    const dateInput = screen.getByLabelText(/date of study/i);

    await user.type(schoolNameInput, 'Harvard University');
    await user.type(titleInput, 'Computer Science');
    await user.type(dateInput, '2020-01-01');

    expect(screen.getByText('Harvard University')).toBeInTheDocument();
    expect(screen.getByText('Computer Science')).toBeInTheDocument();
    expect(screen.getByText('2020-01-01')).toBeInTheDocument();
  });

  it('hides form inputs and shows only preview when Submit button is clicked', async () => {
    const user = userEvent.setup();
    render(<EducationalExperienceForm />);

    const schoolNameInput = screen.getByLabelText(/school name/i);
    const titleInput = screen.getByLabelText(/title of study/i);
    const dateInput = screen.getByLabelText(/date of study/i);

    await user.type(schoolNameInput, 'Harvard University');
    await user.type(titleInput, 'Computer Science');
    await user.type(dateInput, '2020-01-01');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(screen.queryByLabelText(/school name/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/title of study/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/date of study/i)).not.toBeInTheDocument();
    expect(screen.getByText('Harvard University')).toBeInTheDocument();
    expect(screen.getByText('Computer Science')).toBeInTheDocument();
    expect(screen.getByText('2020-01-01')).toBeInTheDocument();
  });

  it('shows Edit button in preview mode that returns to form inputs when clicked', async () => {
    const user = userEvent.setup();
    render(<EducationalExperienceForm />);

    const schoolNameInput = screen.getByLabelText(/school name/i);
    const titleInput = screen.getByLabelText(/title of study/i);
    const dateInput = screen.getByLabelText(/date of study/i);

    await user.type(schoolNameInput, 'Harvard University');
    await user.type(titleInput, 'Computer Science');
    await user.type(dateInput, '2020-01-01');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);

    expect(screen.getByLabelText(/school name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/title of study/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of study/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('allows adding multiple educational experience entries', async () => {
    const user = userEvent.setup();
    render(<EducationalExperienceForm />);

    const schoolNameInput = screen.getByLabelText(/school name/i);
    const titleInput = screen.getByLabelText(/title of study/i);
    const dateInput = screen.getByLabelText(/date of study/i);

    await user.type(schoolNameInput, 'Harvard University');
    await user.type(titleInput, 'Computer Science');
    await user.type(dateInput, '2020-01-01');

    const addButton = screen.getByRole('button', { name: /add/i });
    await user.click(addButton);

    expect(screen.getAllByLabelText(/school name/i)).toHaveLength(2);
    expect(screen.getAllByLabelText(/title of study/i)).toHaveLength(2);
    expect(screen.getAllByLabelText(/date of study/i)).toHaveLength(2);

    expect(screen.getByText('Harvard University')).toBeInTheDocument();
  });

  it('allows deleting individual educational experience entries', async () => {
    const user = userEvent.setup();
    render(<EducationalExperienceForm />);

    const schoolNameInput = screen.getByLabelText(/school name/i);
    const titleInput = screen.getByLabelText(/title of study/i);
    const dateInput = screen.getByLabelText(/date of study/i);

    await user.type(schoolNameInput, 'Harvard University');
    await user.type(titleInput, 'Computer Science');
    await user.type(dateInput, '2020-01-01');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    const addButton = screen.getByRole('button', { name: /add/i });
    await user.click(addButton);

    const schoolNameInput2 = screen.getByLabelText(/school name/i);
    const titleInput2 = screen.getByLabelText(/title of study/i);
    const dateInput2 = screen.getByLabelText(/date of study/i);

    await user.type(schoolNameInput2, 'MIT');
    await user.type(titleInput2, 'Engineering');
    await user.type(dateInput2, '2016-01-01');

    const submitButton2 = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton2);

    expect(screen.getByText('Harvard University')).toBeInTheDocument();
    expect(screen.getByText('MIT')).toBeInTheDocument();

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    await user.click(deleteButtons[0]);

    expect(screen.queryByText('Harvard University')).not.toBeInTheDocument();
    expect(screen.getByText('MIT')).toBeInTheDocument();
  });

  it('prevents submission when required fields are empty', async () => {
    const user = userEvent.setup();
    render(<EducationalExperienceForm />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(screen.getByLabelText(/school name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/title of study/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of study/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('prevents submission when date format is invalid', async () => {
    const user = userEvent.setup();
    render(<EducationalExperienceForm />);

    const schoolNameInput = screen.getByLabelText(/school name/i);
    const titleInput = screen.getByLabelText(/title of study/i);
    const dateInput = screen.getByLabelText(/date of study/i);

    await user.type(schoolNameInput, 'Harvard University');
    await user.type(titleInput, 'Computer Science');
    await user.type(dateInput, 'invalid date abc');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(screen.getByLabelText(/date of study/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });
});
