import { fireEvent, render, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

test('initial conditions', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });

  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole('button', { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();
});

test('initial', () => {
  render(<SummaryForm />);

  const button = screen.getByRole('button', { name: 'Confirm order' });
  const checkbox = screen.getByRole('checkbox', {
    name: 'I agree to Terms and Conditions',
  });

  fireEvent.click(checkbox);
  expect(button).not.toBeDisabled();

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
});
