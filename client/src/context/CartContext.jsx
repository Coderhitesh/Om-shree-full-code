import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the CartContext
const CartContext = createContext();

// Hook to use the cart context
export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
    // Initialize the cart state by loading from localStorage, or default to an empty array
    const [items, setItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart items to localStorage whenever the items state changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    // Function to add an item to the cart
    const addToCart = (product, quantity) => {
        const existingItem = items.find(item => item._id === product._id);
        if (existingItem) {
            setItems(items.map(item =>
                item._id === product._id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            ));
        } else {
            setItems([...items, { ...product, quantity }]);
        }
    };

    // Function to remove an item from the cart
    const removeFromCart = (id) => {
        setItems(items.filter(item => item._id !== id));
    };

    // Function to update the quantity of an item in the cart
    const updateQuantity = (id, quantity) => {
        setItems(items.map(item =>
            item._id === id ? { ...item, quantity } : item
        ));
    };

    // Calculate the total price of items in the cart
    const total = items.reduce((sum, item) => sum + item.afterDiscountPrice * item.quantity, 0);

    // Provide the context values to the components
    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, total }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
