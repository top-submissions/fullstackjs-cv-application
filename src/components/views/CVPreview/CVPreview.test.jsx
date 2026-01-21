import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import CVPreview from './CVPreview';
import React from 'react';
import GeneralInformationForm from '../../forms/GeneralInformationForm/GeneralInformationForm';
import EducationalExperienceForm from '../../forms/EducationalExperienceForm/EducationalExperienceForm';
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

  it('updates in real-time as user types in General Information form fields', async () => {
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

  it('updates in real-time as user types in Educational Experience form fields', async () => {
    const user = userEvent.setup();
    render(
      <EducationalExperienceProvider>
        <EducationalExperienceForm />
        <CVPreview />
      </EducationalExperienceProvider>,
    );

    const schoolNameInput = screen.getByLabelText(/school name/i);
    const titleInput = screen.getByLabelText(/title of study/i);
    const dateInput = screen.getByLabelText(/date of study/i);

    await user.type(schoolNameInput, 'Harvard University');
    await user.type(titleInput, 'Computer Science');
    await user.type(dateInput, '2020-01-01');

    const allSchoolInstances = screen.getAllByText('Harvard University');
    const allTitleInstances = screen.getAllByText('Computer Science');
    const allDateInstances = screen.getAllByText('2020-01-01');

    expect(allSchoolInstances.length).toBeGreaterThan(0);
    expect(allTitleInstances.length).toBeGreaterThan(0);
    expect(allDateInstances.length).toBeGreaterThan(0);
  });
});
