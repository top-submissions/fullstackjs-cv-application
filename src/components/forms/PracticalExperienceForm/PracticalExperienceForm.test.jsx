import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PracticalExperienceForm from './PracticalExperienceForm';

describe('PracticalExperienceForm', () => {
  it('renders the form header', () => {
    render(<PracticalExperienceForm />);
    expect(
      screen.getByRole('heading', { name: /practical experience/i }),
    ).toBeInTheDocument();
  });

  it('renders input fields for Company Name, Position Title, and Date of Employment', () => {
    render(<PracticalExperienceForm />);
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/position title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of employment/i)).toBeInTheDocument();
  });
});
