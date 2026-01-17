import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EducationalExperienceForm from './EducationalExperienceForm';

describe('EducationalExperienceForm', () => {
  it('renders Educational Experience heading', () => {
    render(<EducationalExperienceForm />);
    expect(
      screen.getByRole('heading', { name: /educational experience/i }),
    ).toBeInTheDocument();
  });

  it('renders inputs for School Name, Title of Study, and Date of Study', () => {
    render(<EducationalExperienceForm />);
    expect(screen.getByLabelText(/school name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/title of study/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of study/i)).toBeInTheDocument();
  });
});
