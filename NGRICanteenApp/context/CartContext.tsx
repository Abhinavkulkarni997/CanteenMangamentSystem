import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import { CartItem } from "../types/cart";

interface CartContextType {
  items: CartItem[];

  addItem: (
    item: CartItem
  ) => void;

  removeItem: (
    menuItemId: number
  ) => void;

  increaseQuantity: (
    menuItemId: number
  ) => void;

  decreaseQuantity: (
    menuItemId: number
  ) => void;

  clearCart: () => void;

  totalItems: number;

  totalAmount: number;
}

const CartContext = createContext<CartContextType>(
  {} as CartContextType
);

export const CartProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {

    setItems((current) => {

      const existing = current.find(
        (i) => i.menuItemId === item.menuItemId
      );

      if (existing) {

        return current.map((i) =>
          i.menuItemId === item.menuItemId
            ? {
                ...i,
                quantity: i.quantity + item.quantity,
              }
            : i
        );

      }

      return [...current, item];

    });

  };

  const increaseQuantity = (
    menuItemId: number
  ) => {

    setItems((current) =>
      current.map((item) =>
        item.menuItemId === menuItemId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );

  };

  const decreaseQuantity = (
    menuItemId: number
  ) => {

    setItems((current) =>
      current
        .map((item) =>
          item.menuItemId === menuItemId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );

  };

  const removeItem = (
    menuItemId: number
  ) => {

    setItems((current) =>
      current.filter(
        (item) => item.menuItemId !== menuItemId
      )
    );

  };

  const clearCart = () => {

    setItems([]);

  };

  const totalItems = useMemo(() => {

    return items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

  }, [items]);

  const totalAmount = useMemo(() => {

    return items.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );

  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );

};

export const useCart = () => useContext(CartContext);