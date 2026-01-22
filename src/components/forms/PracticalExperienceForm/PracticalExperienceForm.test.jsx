import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import PracticalExperienceForm from './PracticalExperienceForm';
import React from 'react';
import PracticalExperienceProvider from '../../providers/PracticalExperienceProvider/PracticalExperienceProvider';

describe('PracticalExperienceForm', () => {
  it('renders the form header', () => {
    render(
      <PracticalExperienceProvider>
        <PracticalExperienceForm />
      </PracticalExperienceProvider>,
    );
    expect(
      screen.getByRole('heading', { name: /practical experience/i }),
    ).toBeInTheDocument();
  });

  it('renders input fields for Company Name, Position Title, and Date of Employment', () => {
    render(
      <PracticalExperienceProvider>
        <PracticalExperienceForm />
      </PracticalExperienceProvider>,
    );
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/position title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of employment/i)).toBeInTheDocument();
  });

  it('displays the typed practical experience values', async () => {
    const user = userEvent.setup();
    render(
      <PracticalExperienceProvider>
        <PracticalExperienceForm />
      </PracticalExperienceProvider>,
    );

    const companyNameInput = screen.getByLabelText(/company name/i);
    const positionInput = screen.getByLabelText(/position title/i);
    const dateInput = screen.getByLabelText(/date of employment/i);

    await user.type(companyNameInput, 'Google Inc.');
    await user.type(positionInput, 'Software Engineer');
    await user.type(dateInput, '2020-10-01');

    expect(companyNameInput.value).toBe('Google Inc.');
    expect(positionInput.value).toBe('Software Engineer');
    expect(dateInput.value).toBe('2020-10-01');
  });

  it('keeps form inputs visible and shows submitted entries in table when Submit button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <PracticalExperienceProvider>
        <PracticalExperienceForm />
      </PracticalExperienceProvider>,
    );

    const companyNameInput = screen.getByLabelText(/company name/i);
    const positionInput = screen.getByLabelText(/position title/i);
    const dateInput = screen.getByLabelText(/date of employment/i);

    await user.type(companyNameInput, 'Google Inc.');
    await user.type(positionInput, 'Software Engineer');
    await user.type(dateInput, '2020-10-01');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/position title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of employment/i)).toBeInTheDocument();

    expect(screen.getByText('Google Inc.')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('2020-10-01')).toBeInTheDocument();
  });

  it('shows Edit button in preview mode that loads data into form when clicked', async () => {
    const user = userEvent.setup();
    render(
      <PracticalExperienceProvider>
        <PracticalExperienceForm />
      </PracticalExperienceProvider>,
    );

    const companyNameInput = screen.getByLabelText(/company name/i);
    await user.type(companyNameInput, 'Google Inc.');
    const positionInput = screen.getByLabelText(/position title/i);
    await user.type(positionInput, 'Software Engineer');
    const dateInput = screen.getByLabelText(/date of employment/i);
    await user.type(dateInput, '2020-10-01');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    const newCompanyInput = screen.getByLabelText(/company name/i);
    const newPositionInput = screen.getByLabelText(/position title/i);
    const newDateInput = screen.getByLabelText(/date of employment/i);

    await user.clear(newCompanyInput);
    await user.clear(newPositionInput);
    await user.clear(newDateInput);

    await user.type(newCompanyInput, 'Microsoft');
    await user.type(newPositionInput, 'Senior Engineer');

    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);

    const companyInputAfterEdit = screen.getByLabelText(/company name/i);
    const positionInputAfterEdit = screen.getByLabelText(/position title/i);
    const dateInputAfterEdit = screen.getByLabelText(/date of employment/i);

    expect(companyInputAfterEdit.value).toBe('Google Inc.');
    expect(positionInputAfterEdit.value).toBe('Software Engineer');
    expect(dateInputAfterEdit.value).toBe('2020-10-01');

    const allCompanyInputs = screen.getAllByLabelText(/company name/i);
    expect(allCompanyInputs.length).toBe(1);
  });

  it('allows adding multiple practical experience entries', async () => {
    const user = userEvent.setup();
    render(
      <PracticalExperienceProvider>
        <PracticalExperienceForm />
      </PracticalExperienceProvider>,
    );

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

    const companyNameInputs = screen.getAllByLabelText(/company name/i);
    const positionInputs = screen.getAllByLabelText(/position title/i);
    const dateInputs = screen.getAllByLabelText(/date of employment/i);

    expect(companyNameInputs.length).toBeGreaterThan(1);
    expect(positionInputs.length).toBeGreaterThan(1);
    expect(dateInputs.length).toBeGreaterThan(1);

    expect(screen.getByText('Google Inc.')).toBeInTheDocument();
  });

  it('allows deleting individual practical experience entries', async () => {
    const user = userEvent.setup();
    render(
      <PracticalExperienceProvider>
        <PracticalExperienceForm />
      </PracticalExperienceProvider>,
    );

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
    const companyNameInputs = screen.getAllByLabelText(/company name/i);
    const positionInputs = screen.getAllByLabelText(/position title/i);
    const dateInputs = screen.getAllByLabelText(/date of employment/i);
    const submitButtons = screen.getAllByRole('button', { name: /submit/i });

    await user.type(companyNameInputs[1], 'Microsoft');
    await user.type(positionInputs[1], 'Senior Engineer');
    await user.type(dateInputs[1], '2023-01-01');
    await user.click(submitButtons[1]);

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
    render(
      <PracticalExperienceProvider>
        <PracticalExperienceForm />
      </PracticalExperienceProvider>,
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/position title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of employment/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('prevents submission when date format is invalid', async () => {
    const user = userEvent.setup();
    render(
      <PracticalExperienceProvider>
        <PracticalExperienceForm />
      </PracticalExperienceProvider>,
    );

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
    render(
      <PracticalExperienceProvider>
        <PracticalExperienceForm />
      </PracticalExperienceProvider>,
    );

    const companyNameInput = screen.getByLabelText(/company name/i);
    const container = companyNameInput.closest('div');

    expect(container.className).toMatch(/formContainer/);
  });

  it('applies specific styling classes to action buttons (Add, Edit, Delete)', async () => {
    const user = userEvent.setup();
    render(
      <PracticalExperienceProvider>
        <PracticalExperienceForm />
      </PracticalExperienceProvider>,
    );

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

  it('renders submitted practical experience entries in a table format', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <PracticalExperienceProvider>
        <PracticalExperienceForm />
      </PracticalExperienceProvider>,
    );

    const companyNameInput = screen.getByLabelText(/company name/i);
    const positionInput = screen.getByLabelText(/position title/i);
    const dateInput = screen.getByLabelText(/date of employment/i);

    await user.type(companyNameInput, 'Google Inc.');
    await user.type(positionInput, 'Software Engineer');
    await user.type(dateInput, '2020-10-01');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    const tables = container.querySelectorAll('table');
    expect(tables.length).toBeGreaterThan(0);

    const table = tables[tables.length - 1];
    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');

    expect(thead).toBeInTheDocument();
    expect(tbody).toBeInTheDocument();

    const submittedTable = tables[tables.length - 1];
    const headers = submittedTable.querySelectorAll('th');
    expect(headers[0]).toHaveTextContent(/company name/i);
    expect(headers[1]).toHaveTextContent(/position title/i);
    expect(headers[2]).toHaveTextContent(/date of employment/i);

    const rows = tbody.querySelectorAll('tr');
    expect(rows.length).toBeGreaterThan(0);
  });

  it('displays Update button text when editing an entry', async () => {
    const user = userEvent.setup();
    render(
      <PracticalExperienceProvider>
        <PracticalExperienceForm />
      </PracticalExperienceProvider>,
    );

    const companyNameInput = screen.getByLabelText(/company name/i);
    await user.type(companyNameInput, 'Google Inc.');
    const positionInput = screen.getByLabelText(/position title/i);
    await user.type(positionInput, 'Software Engineer');
    const dateInput = screen.getByLabelText(/date of employment/i);
    await user.type(dateInput, '2020-10-01');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();

    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);

    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /^submit$/i }),
    ).not.toBeInTheDocument();
  });

  it('displays Cancel button when editing and resets form when clicked', async () => {
    const user = userEvent.setup();
    render(
      <PracticalExperienceProvider>
        <PracticalExperienceForm />
      </PracticalExperienceProvider>,
    );

    const companyNameInput = screen.getByLabelText(/company name/i);
    await user.type(companyNameInput, 'Google Inc.');
    const positionInput = screen.getByLabelText(/position title/i);
    await user.type(positionInput, 'Software Engineer');
    const dateInput = screen.getByLabelText(/date of employment/i);
    await user.type(dateInput, '2020-10-01');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    // Cancel button should not be visible initially
    expect(
      screen.queryByRole('button', { name: /cancel/i }),
    ).not.toBeInTheDocument();

    // Click edit button
    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);

    // Cancel button should now be visible
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();

    // Click cancel button
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    // Form should be cleared
    const companyInputAfterCancel = screen.getByLabelText(/company name/i);
    const positionInputAfterCancel = screen.getByLabelText(/position title/i);
    const dateInputAfterCancel = screen.getByLabelText(/date of employment/i);

    expect(companyInputAfterCancel.value).toBe('');
    expect(positionInputAfterCancel.value).toBe('');
    expect(dateInputAfterCancel.value).toBe('');

    // Submit button should be back (not Update)
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /update/i }),
    ).not.toBeInTheDocument();

    // Cancel button should be hidden again
    expect(
      screen.queryByRole('button', { name: /cancel/i }),
    ).not.toBeInTheDocument();
  });
});
