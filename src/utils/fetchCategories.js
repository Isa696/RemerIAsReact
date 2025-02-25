import { ref, get } from 'firebase/database';
import { db } from './firebaseConfig';

async function fetchCategories() {
  try {
    const categoriesRef = ref(db, 'categories');
    const snapshot = await get(categoriesRef);
    
    if (snapshot.exists()) {
      const categories = snapshot.val();
      // Asegurarse de que devolvemos un array de strings
      if (Array.isArray(categories)) {
        return categories;
      }
      // Si es un objeto, convertir a array
      if (typeof categories === 'object') {
        return Object.values(categories);
      }
    }
    return [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default fetchCategories;