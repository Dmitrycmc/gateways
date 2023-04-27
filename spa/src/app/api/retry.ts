import { firstValueFrom, from, Observable } from 'rxjs';

const delay = (ms: number): Promise<void> =>
  new Promise((res) => {
    setTimeout(res, ms);
  });

const retry = <T>(
  prom: () => Promise<T>,
  ms: number,
  count: number,
): Promise<T> => {
  return prom().catch((e) => {
    if (count === 0) {
      throw e;
    } else {
      return delay(ms).then(() => retry(prom, ms, count - 1));
    }
  });
};

const observableToPromise = <T>(obs: Observable<T>): Promise<T> => {
  return firstValueFrom(obs);
};

const promiseToObservable = <T>(prom: Promise<T>): Observable<T> => {
  return from(prom);
};

export const createRetryWrapper =
  (ms: number, count: number) =>
  <T>(obs: Observable<T>): Observable<T> => {
    return promiseToObservable(
      retry(() => observableToPromise(obs), ms, count),
    );
  };
