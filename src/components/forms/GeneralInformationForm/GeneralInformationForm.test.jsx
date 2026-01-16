import { render, screen } from '@testing-library/react';
import GeneralInformationForm from './GeneralInformationForm';
import React from 'react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('GeneralInformationForm', () => {
  it('renders the General Information section', () => {
    render(<GeneralInformationForm />);
    expect(
      screen.getByRole('heading', { name: /general information/i })
    ).toBeInTheDocument();
  });

  it('renders inputs for Name, Email, and Phone', () => {
    render(<GeneralInformationForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
  });

  it('displays the typed General Information', async () => {
    const user = userEvent.setup();
    render(<GeneralInformationForm />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const phoneInput = screen.getByLabelText(/phone/i);

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(phoneInput, '123-456-7890');

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
  });
});
