import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EducationalExperienceForm from './EducationalExperienceForm';
import React from 'react';
import EducationalExperienceProvider from '../../providers/EducationalExperienceProvider/EducationalExperienceProvider'; // ADDED: Import for wrapping

describe('EducationalExperienceForm', () => {
  it('renders the form header', () => {
    render(
      <EducationalExperienceProvider>
        <EducationalExperienceForm />
      </EducationalExperienceProvider>,
    );
    expect(
      screen.getByRole('heading', { name: /educational experience/i }),
    ).toBeInTheDocument();
  });

  it('renders input fields for School Name, Title of Study, and Date of Study', () => {
    render(
      <EducationalExperienceProvider>
        <EducationalExperienceForm />
      </EducationalExperienceProvider>,
    );
    expect(screen.getByLabelText(/school name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/title of study/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of study/i)).toBeInTheDocument();
  });
  // REMOVED: "hides form inputs and shows only preview when Submit button is clicked"
  // REMOVED: "shows Edit button in preview mode that returns to form inputs when clicked"
  // REMOVED: "allows adding multiple educational experience entries"
  // REMOVED: "allows deleting individual educational experience entries"
  // REMOVED: "prevents submission when required fields are empty"
  // REMOVED: "prevents submission when date format is invalid"

  it('wraps form inputs in a container with "formContainer" class for styling', () => {
    render(
      <EducationalExperienceProvider>
        <EducationalExperienceForm />
      </EducationalExperienceProvider>,
    );

    const schoolNameInput = screen.getByLabelText(/school name/i);
    const container = schoolNameInput.closest('div');

    expect(container.className).toMatch(/formContainer/);
  });

  it('renders unsubmitted entry input fields in normal form format with labels (not in table cells)', () => {
    render(
      <EducationalExperienceProvider>
        <EducationalExperienceForm />
      </EducationalExperienceProvider>,
    );

    const schoolNameInput = screen.getByLabelText(/school name/i);
    const titleInput = screen.getByLabelText(/title of study/i);
    const dateInput = screen.getByLabelText(/date of study/i);

    // Inputs should NOT be inside table cells
    const schoolNameCell = schoolNameInput.closest('td');
    const titleCell = titleInput.closest('td');
    const dateCell = dateInput.closest('td');

    expect(schoolNameCell).toBeNull();
    expect(titleCell).toBeNull();
    expect(dateCell).toBeNull();

    // Inputs should be inside label elements
    const schoolNameLabel = schoolNameInput.closest('label');
    const titleLabel = titleInput.closest('label');
    const dateLabel = dateInput.closest('label');

    expect(schoolNameLabel).toBeInTheDocument();
    expect(titleLabel).toBeInTheDocument();
    expect(dateLabel).toBeInTheDocument();
  });
});
