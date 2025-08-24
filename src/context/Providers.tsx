'use client';

import { CartProvider } from './CartContext';
import { ThemeProvider } from './ThemeContext';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </ThemeProvider>
  );
};