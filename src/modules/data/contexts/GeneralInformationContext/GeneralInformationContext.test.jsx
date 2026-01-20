import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  GeneralInformationProvider,
  useGeneralInformation,
} from './GeneralInformationContext';
import PropTypes from 'prop-types';

// Test Component to display context values
const TestConsumer = ({ testId }) => {
  const { generalInformation } = useGeneralInformation();
  return <div data-testid={testId}>{JSON.stringify(generalInformation)}</div>;
};

TestConsumer.propTypes = {
  testId: PropTypes.string.isRequired,
};

describe('GeneralInformationContext', () => {
  it('provides initial values and updates them', () => {
    const initialData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '1234567890',
    };

    render(
      <GeneralInformationProvider initialData={initialData}>
        <TestConsumer testId="context-consumer" />
      </GeneralInformationProvider>,
    );

    const consumerElement = screen.getByTestId('context-consumer');
    expect(consumerElement.textContent).toBe(JSON.stringify(initialData));
  });
});
