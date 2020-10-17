import { renderHook, act } from '@testing-library/react-hooks';

import useInterval from './useInterval';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('useInterval', () => {
  it('should return 0 when value is undefined', async () => {
    const { result } = renderHook(() => useInterval(10));
    expect(result.current).toEqual(0);
  });

  it('should have been called setInterval', async () => {
    await act(async () => renderHook(() => useInterval(10)));

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 10);
  });
});
