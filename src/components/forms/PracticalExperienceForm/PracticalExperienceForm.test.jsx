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
});
