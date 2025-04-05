import { setCookie, getCookie, deleteCookie } from 'cookies-next';

const useCookies = () => {
  const setCookieInDays = (key: string, value: unknown, ageInDays: number): void => {
    try {
      setCookie(key, value, {
        maxAge: ageInDays * 24 * 60 * 60,
        path: '/',
        // httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
    } catch (error) {
      console.error('Error menyimpan ke cookie:', error);
    }
  };

  const getTokenFromCookies = (key: string): string | undefined => {
    try {
      const token = getCookie(key);
      return token?.toString();
    } catch (error) {
      console.error('Error mengambil token dari cookie:', error);
      return undefined;
    }
  };

  const removeCookie = (key: string): void => {
    try {
      deleteCookie(key);
    } catch (error) {
      console.error('Error menghapus cookie:', error);
    }
  };

  return {
    setCookieInDays,
    getTokenFromCookies,
    removeCookie,
  };
};

export default useCookies;
