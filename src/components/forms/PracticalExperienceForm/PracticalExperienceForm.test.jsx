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

  it('loads entry data into form fields when Edit button is clicked', async () => {
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

    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);

    const companyInputAfterEdit = screen.getByLabelText(/company name/i);
    const positionInputAfterEdit = screen.getByLabelText(/position title/i);
    const dateInputAfterEdit = screen.getByLabelText(/date of employment/i);

    expect(companyInputAfterEdit.value).toBe('Google Inc.');
    expect(positionInputAfterEdit.value).toBe('Software Engineer');
    expect(dateInputAfterEdit.value).toBe('2020-10-01');
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

    expect(screen.getByText('Google Inc.')).toBeInTheDocument();

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    expect(screen.queryByText('Google Inc.')).not.toBeInTheDocument();
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

  it('applies specific styling classes to action buttons (Edit, Delete)', async () => {
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

    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);

    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    const companyInputAfterCancel = screen.getByLabelText(/company name/i);
    const positionInputAfterCancel = screen.getByLabelText(/position title/i);
    const dateInputAfterCancel = screen.getByLabelText(/date of employment/i);

    expect(companyInputAfterCancel.value).toBe('');
    expect(positionInputAfterCancel.value).toBe('');
    expect(dateInputAfterCancel.value).toBe('');

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /update/i }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: /cancel/i }),
    ).not.toBeInTheDocument();
  });
});
