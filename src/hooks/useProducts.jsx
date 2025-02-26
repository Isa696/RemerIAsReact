import { ref, remove, get, set } from 'firebase/database';
import { db } from '../utils/firebaseConfig';
import toast from 'react-hot-toast';

export const useProducts = () => {
  const deleteProduct = async (productId) => {
    try {
      // Primero verificamos si el producto existe
      const productRef = ref(db, `products/${productId}`);
      const snapshot = await get(productRef);
      
      if (!snapshot.exists()) {
        toast.error('Producto no encontrado');
        return false;
      }

      // Intentamos eliminar el producto
      await remove(productRef);
      
      // Verificamos si se eliminó correctamente
      const checkSnapshot = await get(productRef);
      if (!checkSnapshot.exists()) {
        toast.success('Producto eliminado exitosamente');
        return true;
      } else {
        throw new Error('No se pudo eliminar el producto');
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      toast.error('Error al eliminar el producto');
      return false;
    }
  };

  const createProduct = async (productData) => {
    try {
      // Obtener todos los productos actuales
      const productsRef = ref(db, 'products');
      const snapshot = await get(productsRef);
      let products = [];
      
      if (snapshot.exists()) {
        products = Object.values(snapshot.val());
      }
      
      // Crear nuevo producto con ID
      const newProduct = {
        ...productData,
        id: products.length // El nuevo ID será el largo del array actual
      };

      // Guardar el producto en Firebase
      await set(ref(db, `products/${newProduct.id}`), newProduct);
      
      toast.success('Producto creado exitosamente');
      return true;
    } catch (error) {
      console.error('Error al crear producto:', error);
      toast.error('Error al crear el producto');
      return false;
    }
  };

  const addCategory = async (newCategory) => {
    try {
      const categoriesRef = ref(db, 'categories');
      const snapshot = await get(categoriesRef);
      let categories = [];
      
      if (snapshot.exists()) {
        categories = snapshot.val();
        
        // Verificar si la categoría ya existe
        if (categories.includes(newCategory)) {
          toast.error('Esta categoría ya existe');
          return false;
        }
      }

      // Agregar nueva categoría al array
      categories.push(newCategory);
      
      // Guardar en Firebase
      await set(categoriesRef, categories);
      
      toast.success('Categoría agregada exitosamente');
      return true;
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error('Error al agregar la categoría');
      return false;
    }
  };

  return {
    deleteProduct,
    createProduct,
    addCategory
  };
};