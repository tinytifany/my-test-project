export const getAccessToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  };
  
  export const setAccessToken = (token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    }
  };
  
  export const removeAccessToken = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }
  };