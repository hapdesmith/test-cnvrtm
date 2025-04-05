const loginAPI = {
  login: async (userId: string, password: string) => {
    try {
      let response = null;
      if (userId === 'admin' && password === 'admin123') {
        response = {
          success: true,
          message: 'Login success',
          token: '1234567890'
        }
      } else {
        response = {
          success: false,
          message: 'Login failed'
        }
      }

      return response;
    } catch (error) {
      throw error;
    }
  },

  register: async (userId: string, password: string, confirmPassword: string) => {
    try {
      let response = null;
      if (password === 'admin123' && confirmPassword === password && userId === 'admin') {
        response = {
          success: true,
          message: 'Register success'
        }
      } else {
        response = {
          success: false,
          message: 'Register failed'
        }
      }

      return response;
    } catch (error) {
      throw error;
    }
  }
};

export default loginAPI;
