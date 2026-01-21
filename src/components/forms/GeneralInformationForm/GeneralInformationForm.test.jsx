import { render, screen } from '@testing-library/react';
import GeneralInformationForm from './GeneralInformationForm';
import React from 'react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import GeneralInformationProvider from '../../providers/GeneralInformationProvider/GeneralInformationProvider'; // ADDED: Import provider for new test
import CVPreview from '../../views/CVPreview/CVPreview'; // ADDED: Import CVPreview for new test

describe('GeneralInformationForm', () => {
  it('renders the form header', () => {
    render(
      <GeneralInformationProvider>
        <GeneralInformationForm />
      </GeneralInformationProvider>,
    );

    expect(
      screen.getByRole('heading', { name: /general information/i }),
    ).toBeInTheDocument();
  });

  it('renders input fields for Name, Email, and Phone', () => {
    render(
      <GeneralInformationProvider>
        <GeneralInformationForm />
      </GeneralInformationProvider>,
    );

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
  });

  it('wraps form inputs in a container with "formContainer" class for styling', () => {
    render(
      <GeneralInformationProvider>
        <GeneralInformationForm />
      </GeneralInformationProvider>,
    );

    const nameInput = screen.getByLabelText(/name/i);
    const container = nameInput.closest('div');

    expect(container.className).toMatch(/formContainer/);
  });
});
