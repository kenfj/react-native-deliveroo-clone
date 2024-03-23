import { Item } from '@/components/sections';
import { create } from 'zustand';

export interface BasketState {
  products: Array<Item & { quantity: number }>;
  addProduct: (item: Item) => void;
  reduceProduct: (item: Item) => void;
  clearCart: () => void;
  items: number;
  total: number;
};

const useBasketStore = create<BasketState>()((set) => ({
  products: [],
  items: 0,
  total: 0,
  addProduct: (product) => {
    set((state) => {
      state.items += 1;
      state.total = Number((state.total + product.price).toFixed(2));
      const hasProduct = state.products.find((p) => p.id === product.id);

      if (hasProduct) {
        hasProduct.quantity += 1;
        return { products: [...state.products] };
      } else {
        return { products: [...state.products, { ...product, quantity: 1 }] }
      }
    })
  },
  reduceProduct: (product) => {
    set((state) => {
      state.items -= 1;
      state.total -= product.price;
      return {
        products: state.products
          .map((p) => {
            if (p.id === product.id) {
              p.quantity -= 1;
            }
            return p;
          })
          .filter((p) => p.quantity > 0),
      };
    })
  },
  clearCart: () => set({ products: [], items: 0, total: 0 }),
}));

export default useBasketStore;
