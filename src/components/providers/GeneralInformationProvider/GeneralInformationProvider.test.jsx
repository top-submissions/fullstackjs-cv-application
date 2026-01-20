import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import GeneralInformationProvider from './GeneralInformationProvider';
import React from 'react';

describe('GeneralInformationProvider', () => {
  it('renders children without crashing', () => {
    render(
      <GeneralInformationProvider>
        <div>Test Child</div>
      </GeneralInformationProvider>,
    );
  });
});
