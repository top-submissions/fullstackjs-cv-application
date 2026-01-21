import { render, screen } from '@testing-library/react';
import GeneralInformationForm from './GeneralInformationForm';
import React from 'react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import GeneralInformationProvider from '../../providers/GeneralInformationProvider/GeneralInformationProvider'; // ADDED: Import provider for new test
import CVPreview from '../../views/CVPreview/CVPreview'; // ADDED: Import CVPreview for new test

describe('GeneralInformationForm', () => {
  it('renders the form header', () => {
    render(<GeneralInformationForm />);
    expect(
      screen.getByRole('heading', { name: /general information/i }),
    ).toBeInTheDocument();
  });

  it('renders input fields for Name, Email, and Phone', () => {
    render(<GeneralInformationForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
  });

  it('wraps form inputs in a container with "formContainer" class for styling', () => {
    render(<GeneralInformationForm />);

    const nameInput = screen.getByLabelText(/name/i);
    const container = nameInput.closest('div');

    expect(container.className).toMatch(/formContainer/);
  });

  it('updates CVPreview in real-time as user types in form fields', async () => {
    const user = userEvent.setup();
    render(
      <GeneralInformationProvider>
        <GeneralInformationForm />
        <CVPreview />
      </GeneralInformationProvider>,
    );

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const phoneInput = screen.getByLabelText(/phone/i);

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(phoneInput, '123-456-7890');

    const allNameInstances = screen.getAllByText('John Doe');
    const allEmailInstances = screen.getAllByText('john@example.com');
    const allPhoneInstances = screen.getAllByText('123-456-7890');

    expect(allNameInstances.length).toBeGreaterThan(0);
    expect(allEmailInstances.length).toBeGreaterThan(0);
    expect(allPhoneInstances.length).toBeGreaterThan(0);
  });
});
