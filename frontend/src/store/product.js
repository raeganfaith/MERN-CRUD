import { create } from "zustand";

// Global state for products
export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  //Function to pass a new product
  createProduct: async (newProduct) => {
    //Check if the fields are empty
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields." };
    }
    // Will run if the conditions are met
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully" };
  },
}));
