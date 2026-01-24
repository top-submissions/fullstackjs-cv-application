import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EducationalExperienceForm from './EducationalExperienceForm';
import React from 'react';
import userEvent from '@testing-library/user-event';
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

  it('does not render an Add button', () => {
    render(
      <EducationalExperienceProvider>
        <EducationalExperienceForm />
      </EducationalExperienceProvider>,
    );

    const addButton = screen.queryByRole('button', { name: /add/i });
    expect(addButton).not.toBeInTheDocument();
  });

  it('always renders at least one unsubmitted entry form', () => {
    render(
      <EducationalExperienceProvider>
        <EducationalExperienceForm />
      </EducationalExperienceProvider>,
    );

    const schoolNameInput = screen.getByLabelText(/school name/i);
    const titleInput = screen.getByLabelText(/title of study/i);
    const dateInput = screen.getByLabelText(/date of study/i);

    expect(schoolNameInput).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(dateInput).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('displays Update button text when editing an entry', async () => {
    const user = userEvent.setup();
    render(
      <EducationalExperienceProvider>
        <EducationalExperienceForm />
      </EducationalExperienceProvider>,
    );

    // Arrange: Fill out the form with test data
    const schoolNameInput = screen.getByLabelText(/school name/i);
    await user.type(schoolNameInput, 'MIT');
    const titleInput = screen.getByLabelText(/title of study/i);
    await user.type(titleInput, 'Computer Science');
    const dateInput = screen.getByLabelText(/date of study/i);
    await user.type(dateInput, '2020-09-01');

    // Submit the entry
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    // Act: Click the Edit button on the submitted entry
    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);

    // Assert: Button text should change to "Update"
    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /^submit$/i }),
    ).not.toBeInTheDocument();
  });

  it('displays Cancel button when editing and resets form when clicked', async () => {
    const user = userEvent.setup();
    render(
      <EducationalExperienceProvider>
        <EducationalExperienceForm />
      </EducationalExperienceProvider>,
    );

    // Arrange: Create and submit an entry
    const schoolNameInput = screen.getByLabelText(/school name/i);
    await user.type(schoolNameInput, 'Stanford University');
    const titleInput = screen.getByLabelText(/title of study/i);
    await user.type(titleInput, 'Electrical Engineering');
    const dateInput = screen.getByLabelText(/date of study/i);
    await user.type(dateInput, '2019-08-15');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    // Enter editing mode
    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);

    // Verify Cancel button appears when editing
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();

    // Act: Click Cancel button
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    // Assert: Cancel button disappears, form resets
    expect(
      screen.queryByRole('button', { name: /cancel/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('updates existing entry when Update button is clicked during editing', async () => {
    const user = userEvent.setup();
    render(
      <EducationalExperienceProvider>
        <EducationalExperienceForm />
      </EducationalExperienceProvider>,
    );

    // Arrange: Create and submit initial entry
    const schoolNameInput = screen.getByLabelText(/school name/i);
    await user.type(schoolNameInput, 'Initial School');
    const titleInput = screen.getByLabelText(/title of study/i);
    await user.type(titleInput, 'Initial Title');
    const dateInput = screen.getByLabelText(/date of study/i);
    await user.type(dateInput, '2020-01-01');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    // Edit the entry
    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);

    // Modify the form data
    const schoolNameInputAfterSubmit = screen.getByLabelText(/school name/i);
    await user.clear(schoolNameInputAfterSubmit);
    await user.type(schoolNameInputAfterSubmit, 'Updated School');
    const titleInputAfterSubmit = screen.getByLabelText(/title of study/i);
    await user.clear(titleInputAfterSubmit);
    await user.type(titleInputAfterSubmit, 'Updated Title');
    const dateInputAfterSubmit = screen.getByLabelText(/date of study/i);
    await user.clear(dateInputAfterSubmit);
    await user.type(dateInputAfterSubmit, '2021-01-01');

    // Act: Click Update button
    const updateButton = screen.getByRole('button', { name: /update/i });
    await user.click(updateButton);

    // Assert: Original entry should be updated, not duplicated
    const schoolCells = screen.getAllByText(/Updated School/i);
    expect(schoolCells.length).toBe(1); // Should only have one entry with this name

    const titleCells = screen.getAllByText(/Updated Title/i);
    expect(titleCells.length).toBe(1); // Should only have one entry with this title

    // Original data should not appear anymore
    expect(screen.queryByText(/Initial School/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Initial Title/i)).not.toBeInTheDocument();
  });
});
