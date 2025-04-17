import { ref, get } from 'firebase/database';
import { db } from './firebaseConfig';

export const fetchAdmins = async () => {
  try {
    const adminsRef = ref(db, 'admins');
    const snapshot = await get(adminsRef);
    
    if (snapshot.exists()) {
      return snapshot.val(); // Devuelve un objeto { uid1: true, uid2: true }
    }
    return {};
  } catch (error) {
    console.error("Error fetching admin UIDs:", error);
    return {};
  }
};
