import { ref, get } from 'firebase/database';
import { db } from './firebaseConfig';

async function fetchFromApi(path) {
  try {
    const productsRef = ref(db, 'products');
    const snapshot = await get(productsRef);
    
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default fetchFromApi;