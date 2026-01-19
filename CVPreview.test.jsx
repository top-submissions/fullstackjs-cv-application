import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CVPreview from './CVPreview';
import React from 'react';

describe('CVPreview', () => {
  it('renders the General Information section header', () => {
    render(<CVPreview />);

    expect(
      screen.getByRole('heading', /general information/i),
    ).toBeInTheDocument();
  });

  it('renders the Educational Experience section header', () => {
    render(<CVPreview />);

    expect(
      screen.getByRole('heading', /educational experience/i),
    ).toBeInTheDocument();
  });

  it('renders the Practical Experience section header', () => {
    render(<CVPreview />);

    expect(
      screen.getByRole('heading', /practical experience/i),
    ).toBeInTheDocument();
  });
});
