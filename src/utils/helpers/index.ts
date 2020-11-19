export const isError = (errors: any, field: string, touched?: any) =>
  touched.length ? errors[field] && touched[field] : !!errors[field];

export const isMobile = (): boolean =>
  /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(
    window.navigator.userAgent ||
      window.navigator.vendor ||
      (window as any).opera,
  );

export const hasUserLocale = () => {
  return (
    sessionStorage.getItem('user') !== null &&
    sessionStorage.getItem('user') !== undefined
  );
};

/**
 * checks if user is admin or not
 *
 */
export const getRole = () => {
  return JSON.parse(
    atob(
      JSON.parse(String(sessionStorage.getItem('user'))).token.split(
        '.',
      )[1],
    ),
  ).role.level;
};

/**
 * return userId
 *
 */

export const getId = () => {
  return JSON.parse(
    atob(
      JSON.parse(String(sessionStorage.getItem('user'))).token.split(
        '.',
      )[1],
    ),
  ).id;
};

//Format bytes
export const formatBytes = (a: number, b = 2) => {
  if (0 === a) return '0 Bytes';
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024));
  return (
    parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
    ' ' +
    ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]
  );
};

//Capitalize String

export const capitalizeOnlyFirst = (string: string) => {
  return (
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  );
};
