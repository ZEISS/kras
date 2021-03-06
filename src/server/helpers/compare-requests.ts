import { KrasRequestQuery, KrasRequest } from '../types';

function queryEquals(a: KrasRequestQuery, b: KrasRequestQuery) {
  const ak = Object.keys(a);
  const bk = Object.keys(b);

  if (ak.length === bk.length) {
    for (const n of ak) {
      if (a[n] !== b[n]) {
        return false;
      }
    }

    return true;
  }

  return false;
}

function stringEquals(a: string, b: string) {
  return a.length === b.length && a.toUpperCase() === b.toUpperCase();
}

function pathEquals(a: string, b: string) {
  const i = a.indexOf('?');

  if (i === b.indexOf('?')) {
    if (i !== -1) {
      a = a.substr(0, i);
      b = b.substr(0, i);
    }

    return stringEquals(a, b);
  }

  return false;
}

export function compareRequests(a: KrasRequest, b: KrasRequest) {
  return (
    a.method === b.method &&
    (!a.target || !b.target || a.target === b.target) &&
    pathEquals(a.url, b.url) &&
    queryEquals(a.query, b.query)
  );
}
