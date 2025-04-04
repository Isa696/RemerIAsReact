import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: [],
  action: {
addToCart: (addedProduct) => {
  set((state) => {
    let newCartValue = [];
    // Verificar si es una remera
    const isShirt = addedProduct.title.toLowerCase().includes("remera");
    
    let isAlreadyAdded = state.cart.some((product) => {
      if (isShirt) {
        // Para remeras, comparar ID, color y talle
        return product.id === addedProduct.id &&
               JSON.stringify(product.newColor) === JSON.stringify(addedProduct.newColor) &&
               JSON.stringify(product.size) === JSON.stringify(addedProduct.size);
      }
      // Para otros productos, solo comparar ID
      return product.id === addedProduct.id;
    });

    if (isAlreadyAdded) {
      newCartValue = state.cart.map((product) => {
        if (isShirt) {
          // Para remeras, actualizar cantidad solo si coincide ID, color y talle
          if (product.id === addedProduct.id &&
              JSON.stringify(product.newColor) === JSON.stringify(addedProduct.newColor) &&
              JSON.stringify(product.size) === JSON.stringify(addedProduct.size)) {
            return { ...product, qty: product.qty + 1 };
          }
        } else {
          // Para otros productos, actualizar cantidad solo por ID
          if (product.id === addedProduct.id) {
            return { ...product, qty: product.qty + 1 };
          }
        }
        return product;
      });
    } else {
      newCartValue = [...state.cart, { ...addedProduct, qty: 1 }];
    }
    
    return { cart: newCartValue };
  });
},
    removeFromCart: (productId) => {
      set((state) => {
        let filteredCart = state.cart.filter(
          (product) => product.id !== productId
        );
        return { cart: filteredCart };
      });
    },
    addProductQuantity(id, newQty) {
      set((state) => {
        if (newQty < 0) {
          state.action.removeFromCart(id);
          return {};
        }
        let newCartValue = state.cart.map((product) => {
          if (product.id === id) {
            // Only limit by actual stock
/*             if (newQty > product.stock) {
              return { ...product, qty: product.stock };
            } */
            return { ...product, qty: newQty };
          }
          return product;
        });
        return { cart: newCartValue };
      });
    },

    emptyCart: () => {
      set({ cart: [] });
    },
  },

}));

export const useCart = () => useCartStore((store) => store.cart);
export const useCartActions = () => useCartStore((store) => store.action);
