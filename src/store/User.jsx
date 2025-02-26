import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';
import { fetchAdmins } from '../utils/fetchAdmins';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      idToken: null,
      loading: false,
      error: null,

      // Login
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const token = await userCredential.user.getIdToken();
          
          // Obtener el email de admin
          const adminEmail = await fetchAdmins();
          const isAdmin = adminEmail === userCredential.user.email;
          console.log(isAdmin);
          
          set({
            user: {
              email: userCredential.user.email,
              isAdmin
            },
            idToken: token,
            loading: false
          });
          return userCredential.user;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      // Register
      register: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          set({ user: userCredential.user, loading: false });
          return userCredential.user;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      // Logout
      logout: async () => {
        set({ loading: true, error: null });
        try {
          await signOut(auth);
          set({ user: null, idToken: null, loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      // Actualizar token
      updateToken: async () => {
          try {
              const user = auth.currentUser;
              if (user) {
                  const newToken = await user.getIdToken(true);
                  set({ idToken: newToken });
                }
            } catch (error) {
                console.error('Error actualizando token:', error);
            }
        },
        resetError: () => set({ error: null })
    }),
    {
      name: 'user-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
      partialize: (state) => ({
        user: state.user ? { 
          email: state.user.email,
          isAdmin: state.user.isAdmin
        } : null,
        idToken: state.idToken
      }),
    }
  )
  
);
export default useUserStore;