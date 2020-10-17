import { renderHook, act } from '@testing-library/react-hooks';

import useBalances from './useBalances';

describe('useBalances', () => {
  it('should return the correct value when applying from->to rates', () => {
    const { result } = renderHook(() => useBalances());
    expect(result.current.convertFromTo(20, 1.2)).toEqual('24.00');
    expect(result.current.convertFromTo(2, 0.8923)).toEqual('1.78');
  });

  it('should return the correct value when applying to->from rates', () => {
    const { result } = renderHook(() => useBalances());
    expect(result.current.convertToFrom(20, 1.2)).toEqual('16.67');
    expect(result.current.convertToFrom(2, 0.8923)).toEqual('2.24');
  });

  it('should allow to exchange if amount is lower than balance', async () => {
    const { result } = renderHook(() => useBalances());
    expect(result.current.calculate('3', '12', '$')).toEqual({
      isNotAllowedToExchange: false,
      fromInfo: '',
      toInfo: '',
    });
  });

  it('should allow to exchange if amount is equal than balance', async () => {
    const { result } = renderHook(() => useBalances());
    expect(result.current.calculate('10', '10', '$')).toEqual({
      isNotAllowedToExchange: false,
      fromInfo: '',
      toInfo: '',
    });
  });

  it('should not allow to exchange if amount is higer than balance', async () => {
    const { result } = renderHook(() => useBalances());
    expect(result.current.calculate('12', '10', '$')).toEqual({
      isNotAllowedToExchange: true,
      fromInfo: 'exceeds balance',
      toInfo: '',
    });
  });

  it('should not allow to exchange if amount is lower than minimum allowed', async () => {
    const { result } = renderHook(() => useBalances());
    expect(result.current.calculate('0.05', '10', '$')).toEqual({
      isNotAllowedToExchange: true,
      fromInfo: 'minimum amount is $0.10',
      toInfo: '',
    });
  });

  it('should not allow to exchange and display a fee info if amount exceeds the fee allowance', async () => {
    const { result } = renderHook(() => useBalances());
    expect(result.current.calculate('1001', '1020', '$')).toEqual({
      isNotAllowedToExchange: false,
      fromInfo: '',
      toInfo: 'Fee: $5.00',
    });
  });

  it('should not allow to exchange and display a fee info if amount exceeds the fee allowance', async () => {
    const { result } = renderHook(() => useBalances());
    expect(
      result.current.exchange(result.current.get(), 'GBP', 'EUR', 9, 11.8),
    ).toEqual([
      { balance: '1.00', code: 'GBP', sign: '£' },
      { balance: '11.80', code: 'EUR', sign: '€' },
      { balance: '0', code: 'USD', sign: '$' },
    ]);
  });
});
