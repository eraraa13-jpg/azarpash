import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  isAdmin: boolean;
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  login: (password: string) => boolean;
  logout: () => void;
}

const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'پایه استند موبایل فلزی',
    description: 'پایه نگهدارنده موبایل تمام فلزی با طراحی مینیمال و مدرن. مناسب برای میز کار و استفاده روزمره. قابل تنظیم در زوایای مختلف.',
    price: 350000,
    category: 'استند موبایل',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
    inStock: true,
    featured: true,
  },
  {
    id: '2',
    name: 'پایه استند لپتاپ آلومینیومی',
    description: 'استند لپتاپ آلومینیومی با قابلیت تنظیم ارتفاع و زاویه. خنک‌کنندگی عالی و طراحی ارگونومیک برای جلوگیری از خستگی گردن.',
    price: 890000,
    category: 'استند لپتاپ',
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=400&fit=crop',
    inStock: true,
    featured: true,
  },
  {
    id: '3',
    name: 'استند موبایل رومیزی چرخشی',
    description: 'پایه موبایل فلزی با قابلیت چرخش ۳۶۰ درجه. ساخته شده از استیل ضد زنگ با روکش مات. مناسب برای ویدیو کال و تماشای فیلم.',
    price: 420000,
    category: 'استند موبایل',
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=400&h=400&fit=crop',
    inStock: true,
    featured: false,
  },
  {
    id: '4',
    name: 'پک اداری کامل فلزی',
    description: 'شامل جای خودکار، جای کارت ویزیت، جای یادداشت و سینی نامه. تمام محصولات از فلز با روکش مشکی مات.',
    price: 1250000,
    category: 'پک اداری',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=400&fit=crop',
    inStock: true,
    featured: true,
  },
  {
    id: '5',
    name: 'استند لپتاپ تاشو مسافرتی',
    description: 'استند لپتاپ فلزی تاشو و سبک‌وزن مناسب حمل در کیف. با قابلیت تنظیم در ۶ زاویه مختلف.',
    price: 650000,
    category: 'استند لپتاپ',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc516b2?w=400&h=400&fit=crop',
    inStock: true,
    featured: false,
  },
  {
    id: '6',
    name: 'جای خودکار فلزی رومیزی',
    description: 'جای خودکار تمام فلزی با طراحی شیک و مینیمال. مناسب میز کار و محیط‌های اداری. دارای پایه ضد لغزش.',
    price: 180000,
    category: 'لوازم اداری',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&h=400&fit=crop',
    inStock: true,
    featured: false,
  },
  {
    id: '7',
    name: 'استند موبایل و تبلت ترکیبی',
    description: 'پایه نگهدارنده فلزی مناسب برای موبایل و تبلت. طراحی ارگونومیک با قابلیت تنظیم زاویه و ارتفاع.',
    price: 520000,
    category: 'استند موبایل',
    image: 'https://images.unsplash.com/photo-1616410011236-7a42121dd981?w=400&h=400&fit=crop',
    inStock: true,
    featured: true,
  },
  {
    id: '8',
    name: 'سینی نامه فلزی اداری',
    description: 'سینی نامه سه طبقه فلزی با روکش پودری. مقاوم و بادوام برای استفاده روزمره در محیط‌های اداری.',
    price: 380000,
    category: 'لوازم اداری',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop',
    inStock: true,
    featured: false,
  },
];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('azarposh_products');
    return saved ? JSON.parse(saved) : defaultProducts;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('azarposh_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem('azarposh_admin') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('azarposh_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('azarposh_cart', JSON.stringify(cart));
  }, [cart]);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const login = (password: string): boolean => {
    if (password === 'azarpp1234') {
      setIsAdmin(true);
      sessionStorage.setItem('azarposh_admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('azarposh_admin');
  };

  return (
    <StoreContext.Provider value={{
      products, cart, isAdmin,
      setProducts, addProduct, updateProduct, deleteProduct,
      addToCart, removeFromCart, updateCartQuantity, clearCart,
      login, logout,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
