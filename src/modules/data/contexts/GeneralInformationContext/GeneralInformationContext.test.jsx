// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { describe, it, expect } from 'vitest';
// import {
//   GeneralInformationProvider,
//   useGeneralInformation,
// } from './GeneralInformationContext';
// import PropTypes from 'prop-types';

// const TestComponent = ({ testId = 'consumer' }) => {
//   const { generalInformation, setGeneralInformation } = useGeneralInformation();

//   const handleUpdate = () => {
//     const newData = {
//       name: 'Jane Doe',
//       email: 'janedoe@example.com',
//       phone: '0987654321',
//     };
//     setGeneralInformation(newData);
//   };

//   return (
//     <div>
//       <div data-testid={testId}>{JSON.stringify(generalInformation)}</div>
//       <button onClick={handleUpdate}>Update</button>
//     </div>
//   );
// };

// TestComponent.propTypes = {
//   testId: PropTypes.string,
// };

// describe('GeneralInformationContext', () => {
//   it('provides initial values', () => {
//     const initialData = {
//       name: 'John Doe',
//       email: 'johndoe@example.com',
//       phone: '1234567890',
//     };

//     render(
//       <GeneralInformationProvider initialData={initialData}>
//         <TestComponent />
//       </GeneralInformationProvider>,
//     );

//     const consumerElement = screen.getByTestId('consumer');
//     expect(consumerElement.textContent).toBe(JSON.stringify(initialData));
//   });

//   it('updates the context value when the update function is called', async () => {
//     const user = userEvent.setup();
//     const initialData = {
//       name: 'John Doe',
//       email: 'johndoe@example.com',
//       phone: '1234567890',
//     };
//     const newData = {
//       name: 'Jane Doe',
//       email: 'janedoe@example.com',
//       phone: '0987654321',
//     };

//     render(
//       <GeneralInformationProvider initialData={initialData}>
//         <TestComponent />
//       </GeneralInformationProvider>,
//     );

//     await user.click(screen.getByText('Update'));

//     const consumerElement = screen.getByTestId('consumer');
//     expect(consumerElement.textContent).toBe(JSON.stringify(newData));
//   });
// });
