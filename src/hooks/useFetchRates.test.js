import { renderHook, act } from '@testing-library/react-hooks';
import useFetchRates from './useFetchRates';

afterEach(() => {
  jest.clearAllMocks();
});

const mockFetch = (response) =>
  jest
    .spyOn(global, 'fetch')
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve(response) }),
    );

describe('useFetchRates', () => {
  it('should not make a request when fromCurrency is undefined', async () => {
    const spy = jest.spyOn(global, 'fetch');
    renderHook(() => useFetchRates());

    expect(spy).not.toBeCalled();
  });

  it('should set results array when term is matching a search', async () => {
    const mockSuccessResponse = {
      base: 'GBP',
      rates: {
        EUR: 1.102125,
        USD: 1.293682,
      },
    };

    mockFetch(mockSuccessResponse);

    const { result } = renderHook(() => useFetchRates('GBP'));
    await act(async () => result.current);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual(mockSuccessResponse.rates);
  });
});
