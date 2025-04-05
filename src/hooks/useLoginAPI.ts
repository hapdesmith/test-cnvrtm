import { useState } from 'react';
import useCookies from '@/hooks/useCookie';
import loginAPI from '@/api/login';
import { useRouter } from 'next/navigation';
import { useMessage } from '@/contexts/message/context';
import { COOKIE_KEY } from '@/constant';

export const useLoginAPI = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showError, showSuccess } = useMessage();
  const { setCookieInDays } = useCookies();
  const handleLogin = async (userId: string, password: string) => {
    setLoading(true);
    try {
      const response = await loginAPI.login(userId, password);
      if (response?.success) {
        setCookieInDays(COOKIE_KEY.CONVERTIM_TOKEN, response?.token, 365);
        showSuccess('Login success');
        router.push("/");
      } else {
        showError('Username or password is incorrect');
      }
    } catch (err) {
      showError('There is an error in the system, please try again later');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (userId: string, password: string, confirmPassword: string) => {
    setLoading(true);
    try {
      const response = await loginAPI.register(userId, password, confirmPassword);
      if (response?.success) {
        showSuccess('Register success');
        router.push("/login");
      } else {
        showError('Register failed');
      }
    } catch (err) {
      showError('There is an error in the system, please try again later');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    login: handleLogin,
    register: handleRegister,
    loading,
  };
};
