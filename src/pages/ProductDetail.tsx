import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight, Check, Package } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useStore } from '../context/StoreContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useStore();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">محصول یافت نشد</h2>
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">بازگشت به صفحه اصلی</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: number) => price.toLocaleString('fa-IR') + ' تومان';

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-gray-900">صفحه اصلی</Link>
          <span>/</span>
          <Link to={`/?category=${encodeURIComponent(product.category)}`} className="hover:text-gray-900">{product.category}</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <span className="text-sm text-gray-400 bg-gray-50 px-3 py-1 rounded-full inline-block w-fit mb-4">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</span>
              {product.inStock ? (
                <span className="flex items-center gap-1 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  <Check size={14} /> موجود
                </span>
              ) : (
                <span className="text-sm text-red-600 bg-red-50 px-3 py-1 rounded-full">ناموجود</span>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => addToCart(product)}
                disabled={!product.inStock}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 text-white rounded-xl font-medium text-sm hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={18} />
                افزودن به سبد خرید
              </button>
              <Link
                to="/cart"
                className="px-6 py-3.5 border border-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                سبد خرید
              </Link>
            </div>

            {/* Features */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                    <Check size={14} className="text-gray-600" />
                  </div>
                  <span className="text-xs text-gray-600">جنس فلزی مرغوب</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                    <Check size={14} className="text-gray-600" />
                  </div>
                  <span className="text-xs text-gray-600">گارانتی اصالت</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                    <Check size={14} className="text-gray-600" />
                  </div>
                  <span className="text-xs text-gray-600">ارسال سریع</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                    <Check size={14} className="text-gray-600" />
                  </div>
                  <span className="text-xs text-gray-600">طراحی ارگونومیک</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-xl font-bold text-gray-900 mb-6">محصولات مرتبط</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map(p => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="group border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="aspect-square bg-gray-50 overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{p.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
