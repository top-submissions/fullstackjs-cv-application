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
    await user.type(dateInput, '2020-2024');

    expect(screen.getByText('Harvard University')).toBeInTheDocument();
    expect(screen.getByText('Computer Science')).toBeInTheDocument();
    expect(screen.getByText('2020-2024')).toBeInTheDocument();
  });

  it('hides form inputs and shows only preview when Submit button is clicked', async () => {
    const user = userEvent.setup();
    render(<EducationalExperienceForm />);

    const schoolNameInput = screen.getByLabelText(/school name/i);
    const titleInput = screen.getByLabelText(/title of study/i);
    const dateInput = screen.getByLabelText(/date of study/i);

    await user.type(schoolNameInput, 'Harvard University');
    await user.type(titleInput, 'Computer Science');
    await user.type(dateInput, '2020-2024');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(screen.queryByLabelText(/school name/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/title of study/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/date of study/i)).not.toBeInTheDocument();
    expect(screen.getByText('Harvard University')).toBeInTheDocument();
    expect(screen.getByText('Computer Science')).toBeInTheDocument();
    expect(screen.getByText('2020-2024')).toBeInTheDocument();
  });
});
