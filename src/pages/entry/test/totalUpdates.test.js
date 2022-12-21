import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OrderDetailsProvider } from '../../../contexts/OrderDeatails';
import Options from '../Options';

test('update scoop subtotal when scoops change', async () => {
  const user = userEvent.setup();
  render(<Options optionType='scoops' />, { wrapper: OrderDetailsProvider });

  //  make sure total starts out $0.00
  const scoopSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');

  expect(scoopSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2 and check the subtotal
  const chocolateTotal = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });

  await user.clear(chocolateTotal);
  await user.type(chocolateTotal, '2');

  expect(scoopSubtotal).toHaveTextContent('6.00');
});
