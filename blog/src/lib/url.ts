export function createUrl(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

export function getImagePath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}