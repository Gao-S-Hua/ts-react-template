const AUTH_KEY = 'AUTHORITY_TOKEN';

function verify(token: string|null): boolean {
  if (token == null) return false;
  if (token.length === 8) return true;
  return false;
}

export const getJWT = () : string|null => {
  if (localStorage.getItem(AUTH_KEY)) {
    return localStorage.getItem(AUTH_KEY);
  } else return null;
}

export const verifyJWT = (): boolean => {
  const auth: string|null = localStorage.getItem(AUTH_KEY);
  return verify(auth);
}

export const setJWT = (token: string): void => {
  console.log('Set Token:' + token);
  localStorage.setItem(AUTH_KEY, token);
}

export const clearJWT = (): void => {
  localStorage.removeItem(AUTH_KEY);
}

const userAuth = { verifyJWT, setJWT, clearJWT, getJWT };
export default userAuth;
