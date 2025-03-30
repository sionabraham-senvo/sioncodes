export function getBasePath() {
  return process.env.NODE_ENV === 'production' ? '/sioncodes' : '';
}

export function createUrl(path: string) {
  const basePath = getBasePath();
  // Ensure path starts with / and doesn't duplicate with basePath
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}

export function getImagePath(path: string) {
  const basePath = process.env.NODE_ENV === 'production' ? '/sioncodes' : '';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}