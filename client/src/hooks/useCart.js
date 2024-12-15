import { useState, useEffect } from 'react';

export const useCart = () => {
  const [items, setItems] = useState(() => {
    const savedItems = sessionStorage.getItem('cartItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    sessionStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === product._id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevItems, {
        _id: product._id,
        name: product.name,
        afterDiscountPrice: product.afterDiscountPrice,
        images: product.images,
        quantity
      }];
    });
  };

  const removeFromCart = (productId) => {
    setItems(prevItems => prevItems.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item._id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const total = items.reduce(
    (sum, item) => sum + (item.afterDiscountPrice * item.quantity),
    0
  );

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    total
  };
};

export default useCart;