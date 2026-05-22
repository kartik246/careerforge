export function getQueryParams() {
  const params = {};
  const searchParams = new URLSearchParams(window.location.search);
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  return params;
}
