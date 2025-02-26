import useUserStore from '../store/User';

export const useAdmin = () => {
  const user = useUserStore(state => state.user);
  
  const isAdmin = () => {
    return user?.isAdmin || false;
  };

  return { isAdmin };
};