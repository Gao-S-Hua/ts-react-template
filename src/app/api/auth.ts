const AUTH = 'AUTHORITY_TOKEN';
const DEFAULT_TOKEN = 'g3s7h2a2';

function verify(token: string|null): boolean {
  if (token == null) return false;
  if (token.length === 8) return true;
  return false;
}

export const verifyJWT = (): boolean => {
  const auth: string|null = localStorage.getItem(AUTH);
  return verify(auth);
}

export const setJWT = (): void => {
  localStorage.setItem(AUTH, DEFAULT_TOKEN);
}

export const clearJWT = (): void => {
  localStorage.removeItem(AUTH);
}

const userAuth = { verifyJWT, setJWT, clearJWT };
export default userAuth;
