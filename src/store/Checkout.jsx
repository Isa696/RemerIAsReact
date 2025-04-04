import { createStore } from 'zustand/vanilla'
import { useStore } from 'zustand'

export const store = createStore((set) => ({
  formData: {
    firstname: '',
    lastname: '',
    email: '',
    province: '',
    city: '',
    address: '',
    postalCode: '',
    phone: '',
    notes: '',
  },
  errors: {},
  setFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data }
  })),
  setErrors: (errors) => set({ errors }),

  resetForm: () => set({
    formData: {
      firstname: '',
      lastname: '',
      email: '',
      province: '',
      city: '',
      address: '',
      postalCode: '',
      phone: '',
      notes: '',
    },
    errors: {}
  }),
  validateForm: (deliveryOption) => {
    const state = store.getState();
    const { formData } = state;
    const newErrors = {};
  
    // Validaciones de ContactInformation
    if (!formData.firstname.trim()) {
      newErrors.firstname = 'El nombre es requerido';
    }
    if (!formData.lastname.trim()) {
      newErrors.lastname = 'El apellido es requerido';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Email válido requerido';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Teléfono requerido';
    } else if (isNaN(formData.phone)) {
      newErrors.phone = 'Teléfono solo números';
    } else if (formData.phone.length < 6) {
      newErrors.phone = 'Teléfono mínimo 6 dígitos';
    }
  
    // Validaciones de ShippingAddress solo si es "envio"
    if (deliveryOption === "envio") {
      if (!formData.province.trim()) {
        newErrors.province = 'Provincia requerida';
      }
      if (!formData.city.trim()) {
        newErrors.city = 'Ciudad requerida';
      }
      if (!formData.address.trim()) {
        newErrors.address = 'Dirección requerida';
      }
      if (!formData.postalCode.trim()) {
        newErrors.postalCode = 'Codigo Postal requerida';
      }
    }
  
    store.setState({ errors: newErrors });
    return Object.keys(newErrors).length === 0;
  }
}));

export const useCheckoutStore = () => useStore(store)