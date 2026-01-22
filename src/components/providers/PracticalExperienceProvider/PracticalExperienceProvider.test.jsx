import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PracticalExperienceProvider from './PracticalExperienceProvider';
import React from 'react';

describe('PracticalExperienceProvider', () => {
  it('renders children without crashing', () => {
    render(
      <PracticalExperienceProvider>
        <div>Test Child</div>
      </PracticalExperienceProvider>,
    );
  });
});
