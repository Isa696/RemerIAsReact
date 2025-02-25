export const validateToken = () => {
    try {
      // Obtener datos del localStorage
      const userData = localStorage.getItem('user-storage');
      if (!userData) return false;
  
      // Parsear los datos
      const parsedData = JSON.parse(userData);
      const token = parsedData?.state?.idToken;
  
      if (!token) return false;
  
      // Decodificar y verificar el token
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      // Verificar expiración
      if (payload.exp * 1000 < Date.now()) {
        // Limpiar localStorage y retornar false si expiró
        localStorage.removeItem('user-storage');
        return false;
      }
  
      return true;
    } catch (error) {
      console.error('Error validando token:', error);
      // En caso de error, limpiar localStorage
      localStorage.removeItem('user-storage');
      return false;
    }
  };