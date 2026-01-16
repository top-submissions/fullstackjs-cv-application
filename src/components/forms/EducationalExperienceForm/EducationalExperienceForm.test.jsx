import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EducationalExperienceForm from './EducationalExperienceForm';

describe('EducationalExperienceForm', () => {
  it('renders Educational Experience heading', () => {
    render(<EducationalExperienceForm />);
    expect(
      screen.getByRole('heading', { name: /educational experience/i })
    ).toBeInTheDocument();
  });
});
