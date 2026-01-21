import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CVPreview from './CVPreview';
import React from 'react';
import GeneralInformationProvider from '../../providers/GeneralInformationProvider/GeneralInformationProvider';
import EducationalExperienceProvider from '../../providers/EducationalExperienceProvider/EducationalExperienceProvider';

describe('CVPreview', () => {
  it('renders the General Information section header', () => {
    render(
      <GeneralInformationProvider>
        <EducationalExperienceProvider>
          <CVPreview />
        </EducationalExperienceProvider>
      </GeneralInformationProvider>,
    );

    expect(screen.getByText(/General Information/i)).toBeInTheDocument();
  });

  it('renders the Educational Experience section header', () => {
    render(
      <GeneralInformationProvider>
        <EducationalExperienceProvider>
          <CVPreview />
        </EducationalExperienceProvider>
      </GeneralInformationProvider>,
    );

    expect(screen.getByText(/Educational Experience/i)).toBeInTheDocument();
  });

  it('renders the Practical Experience section header', () => {
    render(
      <GeneralInformationProvider>
        <EducationalExperienceProvider>
          <CVPreview />
        </EducationalExperienceProvider>
      </GeneralInformationProvider>,
    );

    expect(screen.getByText(/Practical Experience/i)).toBeInTheDocument();
  });
});
