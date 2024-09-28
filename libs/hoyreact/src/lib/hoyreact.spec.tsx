import { render } from '@testing-library/react';

import Hoyreact from './hoyreact';

describe('Hoyreact', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Hoyreact />);
    expect(baseElement).toBeTruthy();
  });
});
