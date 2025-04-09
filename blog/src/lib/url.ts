export function getBasePath() {
  return process.env.NODE_ENV === 'production' ? '' : '';
}

export function createUrl(path: string) {
  const basePath = getBasePath();
  // Ensure path starts with / and doesn't duplicate with basePath
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}

export function getImagePath(path: string) {
  const basePath = getBasePath();
  // Clean the path and ensure it doesn't already contain the base path
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // Avoid duplicating the base path
  if (basePath && cleanPath.startsWith(basePath)) {
    return cleanPath;
  }

  return `${basePath}${cleanPath}`;
}