import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useStore } from '../context/StoreContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useStore();

  const formatPrice = (price: number) => price.toLocaleString('fa-IR') + ' تومان';

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 0 ? (subtotal > 2000000 ? 0 : 50000) : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">سبد خرید شما خالی است</h2>
          <p className="text-sm text-gray-500 mb-6">محصولات مورد نظر خود را به سبد خرید اضافه کنید</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            <ArrowRight size={16} />
            مشاهده محصولات
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">سبد خرید</h1>
          <button
            onClick={clearCart}
            className="text-sm text-red-500 hover:text-red-700 transition-colors"
          >
            حذف همه
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.product.id} className="flex gap-4 p-4 border border-gray-100 rounded-2xl">
                <Link to={`/product/${item.product.id}`} className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.product.id}`}>
                    <h3 className="font-medium text-gray-900 text-sm line-clamp-1 hover:text-gray-600">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-500 mt-1">{item.product.category}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gray-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">خلاصه سفارش</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">جمع کل محصولات</span>
                  <span className="text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">هزینه ارسال</span>
                  <span className="text-gray-900">
                    {shipping === 0 ? 'رایگان' : formatPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gray-400">
                    سفارش بالای ۲,۰۰۰,۰۰۰ تومان ارسال رایگان دارد
                  </p>
                )}
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-bold text-gray-900">مبلغ قابل پرداخت</span>
                  <span className="font-bold text-gray-900">{formatPrice(total)}</span>
                </div>
              </div>
              <button className="w-full mt-6 px-6 py-3.5 bg-gray-900 text-white rounded-xl font-medium text-sm hover:bg-gray-700 transition-colors">
                تکمیل سفارش
              </button>
              <Link
                to="/"
                className="w-full mt-3 block text-center px-6 py-3 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-white transition-colors"
              >
                ادامه خرید
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
