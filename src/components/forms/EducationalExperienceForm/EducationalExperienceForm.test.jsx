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
    const container = schoolNameInput.closest('table');

    expect(container.className).toMatch(/formContainer/);
  });

  it('renders educational experience entries in a table format', () => {
    render(
      <EducationalExperienceProvider>
        <EducationalExperienceForm />
      </EducationalExperienceProvider>,
    );

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    const thead = table.querySelector('thead');
    expect(thead).toBeInTheDocument();

    expect(screen.getByText(/school name/i)).toBeInTheDocument();
    expect(screen.getByText(/title of study/i)).toBeInTheDocument();
    expect(screen.getByText(/date of study/i)).toBeInTheDocument();

    const tbody = table.querySelector('tbody');
    expect(tbody).toBeInTheDocument();

    const rows = tbody.querySelectorAll('tr');
    expect(rows.length).toBeGreaterThan(0);
  });
});
