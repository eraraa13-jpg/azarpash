import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Star, Package } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useStore } from '../context/StoreContext';

const Home: React.FC = () => {
  const { products, addToCart } = useStore();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [products, category, search]);

  const featuredProducts = products.filter(p => p.featured);
  const categories = ['استند موبایل', 'استند لپتاپ', 'لوازم اداری', 'پک اداری'];

  const formatPrice = (price: number) => {
    return price.toLocaleString('fa-IR') + ' تومان';
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      {!category && !search && (
        <section className="relative overflow-hidden bg-gradient-to-bl from-gray-900 via-gray-800 to-gray-900">
          <div className="absolute inset-0">
            <img
              src="https://image.qwenlm.ai/generated-images/3e47b686-f210-4b52-bc95-62d993363044/_result.png"
              alt="آذرپاش"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-gray-900/90 via-gray-900/70 to-gray-900/50"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-300">تولیدکننده محصولات فلزی</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                محصولات فلزی
                <br />
                <span className="text-gray-400">با طراحی مینیمال</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                آذرپاش، تولیدکننده پایه‌های استند و لوازم اداری فلزی با کیفیت بالا و طراحی مدرن. محصولات ما ترکیبی از زیبایی و کارایی هستند.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/?category=استند لپتاپ"
                  className="px-6 py-3 bg-white text-gray-900 rounded-xl font-medium text-sm hover:bg-gray-100 transition-colors"
                >
                  مشاهده محصولات
                </Link>
                <Link
                  to="/?category=پک اداری"
                  className="px-6 py-3 border border-white/20 text-white rounded-xl font-medium text-sm hover:bg-white/10 transition-colors"
                >
                  پک‌های اداری
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      {!category && !search && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/?category=${encodeURIComponent(cat)}`}
                className="group p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all hover:shadow-sm"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Package size={22} className="text-gray-700" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{cat}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {products.filter(p => p.category === cat).length} محصول
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      {!category && !search && featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">محصولات ویژه</h2>
              <p className="text-sm text-gray-500 mt-1">پرفروش‌ترین محصولات آذرپاش</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                formatPrice={formatPrice}
                addToCart={addToCart}
              />
            ))}
          </div>
        </section>
      )}

      {/* All Products / Filtered */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {category ? category : search ? `نتایج جستجو: "${search}"` : 'همه محصولات'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{filteredProducts.length} محصول</p>
          </div>
          {(category || search) && (
            <Link to="/" className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
              <ArrowLeft size={16} />
              بازگشت
            </Link>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">محصولی یافت نشد</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                formatPrice={formatPrice}
                addToCart={addToCart}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

interface ProductCardProps {
  product: any;
  formatPrice: (price: number) => string;
  addToCart: (product: any) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, formatPrice, addToCart }) => {
  return (
    <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-gray-100/50 transition-all duration-300">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square bg-gray-50 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{product.category}</span>
          {product.featured && (
            <span className="flex items-center gap-0.5 text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              <Star size={10} fill="currentColor" /> ویژه
            </span>
          )}
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 hover:text-gray-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-3">
          <span className="text-sm font-bold text-gray-900">{formatPrice(product.price)}</span>
          <button
            onClick={() => addToCart(product)}
            className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
            title="افزودن به سبد"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
