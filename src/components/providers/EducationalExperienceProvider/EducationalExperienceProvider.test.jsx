import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EducationalExperienceProvider from './EducationalExperienceProvider';
import React, { useContext } from 'react';
import EducationalExperienceContext from '../../../modules/data/contexts/EducationalExperienceContext';

describe('EducationalExperienceProvider', () => {
  it('renders children without crashing', () => {
    render(
      <EducationalExperienceProvider>
        <div>Test Child</div>
      </EducationalExperienceProvider>,
    );
  });
});
