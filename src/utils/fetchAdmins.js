import { ref, get } from 'firebase/database';
import { db } from './firebaseConfig';

export const fetchAdmins = async () => {
  try {
    const adminsRef = ref(db, 'admin/email');
    const snapshot = await get(adminsRef);
    
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return [];
  } catch (error) {
    console.error("Error fetching admin email:", error);
    return [];
  }
};
