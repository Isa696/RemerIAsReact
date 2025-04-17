import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { fetchAdmins } from "../utils/fetchAdmins";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,

      // Login

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const uid = userCredential.user.uid;
      
          // Verificar si el UID es admin
          const adminUIDs = await fetchAdmins();
          const isAdmin = !!adminUIDs[uid];
      
          set({
            user: {
              email: userCredential.user.email,
              uid,
              isAdmin,
            },
            loading: false,
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
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          set({
            user: {
              email: userCredential.user.email,
              uid: userCredential.user.uid, // Adding uid
              isAdmin: false,
            },
            loading: false,
          });
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
          set({ user: null, loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      resetError: () => set({ error: null }),
    }),
    {
      name: "user-storage",
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
        user: state.user
          ? {
              email: state.user.email,
              uid: state.user.uid,
              isAdmin: state.user.isAdmin,
            }
          : null,
      }),
    }
  )
);
export default useUserStore;
