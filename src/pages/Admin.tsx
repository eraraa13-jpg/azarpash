import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut, Plus, Edit3, Trash2, Package, LayoutDashboard,
  X, Save, Eye, EyeOff, Star, Image, Search, Settings
} from 'lucide-react';
import { useStore, Product } from '../context/StoreContext';

const Admin: React.FC = () => {
  const { products, isAdmin, logout, addProduct, updateProduct, deleteProduct } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'settings'>('dashboard');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Site settings
  const [siteName, setSiteName] = useState(() => localStorage.getItem('azarposh_sitename') || 'آذرپاش');
  const [sitePhone, setSitePhone] = useState(() => localStorage.getItem('azarposh_phone') || '۰۲۱-۱۲۳۴۵۶۷۸');
  const [siteEmail, setSiteEmail] = useState(() => localStorage.getItem('azarposh_email') || 'info@azarposh.ir');
  const [siteAddress, setSiteAddress] = useState(() => localStorage.getItem('azarposh_address') || 'تهران، خیابان ولیعصر');
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(() => localStorage.getItem('azarposh_freeship') || '2000000');

  if (!isAdmin) {
    navigate('/admin/login');
    return null;
  }

  const formatPrice = (price: number) => price.toLocaleString('fa-IR') + ' تومان';

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = products.reduce((sum, p) => sum + p.price, 0);
  const featuredCount = products.filter(p => p.featured).length;
  const inStockCount = products.filter(p => p.inStock).length;
  const categories = [...new Set(products.map(p => p.category))];

  const handleSaveSettings = () => {
    localStorage.setItem('azarposh_sitename', siteName);
    localStorage.setItem('azarposh_phone', sitePhone);
    localStorage.setItem('azarposh_email', siteEmail);
    localStorage.setItem('azarposh_address', siteAddress);
    localStorage.setItem('azarposh_freeship', freeShippingThreshold);
    alert('تنظیمات ذخیره شد');
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setDeleteConfirm(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">آ</span>
              </div>
              <span className="font-bold text-gray-900">پنل مدیریت آذرپاش</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                مشاهده سایت
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={16} />
                خروج
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex items-center gap-1 mb-8 bg-white rounded-xl p-1 border border-gray-200 w-fit">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'dashboard' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <LayoutDashboard size={16} />
            داشبورد
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'products' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Package size={16} />
            محصولات
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'settings' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Settings size={16} />
            تنظیمات
          </button>
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard title="کل محصولات" value={products.length.toString()} icon={<Package size={20} />} />
              <StatCard title="محصولات ویژه" value={featuredCount.toString()} icon={<Star size={20} />} />
              <StatCard title="موجود" value={inStockCount.toString()} icon={<Eye size={20} />} />
              <StatCard title="دسته‌بندی‌ها" value={categories.length.toString()} icon={<LayoutDashboard size={20} />} />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">آخرین محصولات</h3>
              <div className="space-y-3">
                {products.slice(-5).reverse().map(p => (
                  <div key={p.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.category}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{formatPrice(p.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products Management */}
        {activeTab === 'products' && (
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="relative flex-1 w-full sm:max-w-xs">
                <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجوی محصولات..."
                  className="w-full pr-9 pl-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                />
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                <Plus size={16} />
                افزودن محصول
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-right text-xs font-medium text-gray-500 px-4 py-3">محصول</th>
                      <th className="text-right text-xs font-medium text-gray-500 px-4 py-3">دسته‌بندی</th>
                      <th className="text-right text-xs font-medium text-gray-500 px-4 py-3">قیمت</th>
                      <th className="text-right text-xs font-medium text-gray-500 px-4 py-3">وضعیت</th>
                      <th className="text-right text-xs font-medium text-gray-500 px-4 py-3">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredProducts.map(product => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                            <span className="text-sm font-medium text-gray-900 max-w-[200px] truncate">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{product.category}</span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{formatPrice(product.price)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {product.inStock ? (
                              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">موجود</span>
                            ) : (
                              <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">ناموجود</span>
                            )}
                            {product.featured && (
                              <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">ویژه</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(product.id)}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredProducts.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-sm text-gray-500">محصولی یافت نشد</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 max-w-2xl">
            <h3 className="font-bold text-gray-900 mb-6">تنظیمات سایت</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">نام سایت</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">شماره تماس</label>
                <input
                  type="text"
                  value={sitePhone}
                  onChange={(e) => setSitePhone(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
                <input
                  type="email"
                  value={siteEmail}
                  onChange={(e) => setSiteEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">آدرس</label>
                <input
                  type="text"
                  value={siteAddress}
                  onChange={(e) => setSiteAddress(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">حد ارسال رایگان (تومان)</label>
                <input
                  type="number"
                  value={freeShippingThreshold}
                  onChange={(e) => setFreeShippingThreshold(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                />
              </div>
              <button
                onClick={handleSaveSettings}
                className="mt-4 flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                <Save size={16} />
                ذخیره تنظیمات
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {(showAddForm || editingProduct) && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => { setShowAddForm(false); setEditingProduct(null); }}
          onSave={(product) => {
            if (editingProduct) {
              updateProduct(product);
            } else {
              addProduct(product);
            }
            setShowAddForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="font-bold text-gray-900 mb-2">حذف محصول</h3>
            <p className="text-sm text-gray-600 mb-6">آیا از حذف این محصول مطمئن هستید؟ این عمل قابل بازگشت نیست.</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors"
              >
                حذف
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Stat Card Component
const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <div className="bg-white rounded-2xl border border-gray-200 p-5">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600">
        {icon}
      </div>
    </div>
  </div>
);

// Product Form Modal
interface ProductFormModalProps {
  product: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ product, onClose, onSave }) => {
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price?.toString() || '');
  const [category, setCategory] = useState(product?.category || 'استند موبایل');
  const [image, setImage] = useState(product?.image || '');
  const [inStock, setInStock] = useState(product?.inStock ?? true);
  const [featured, setFeatured] = useState(product?.featured ?? false);

  const categories = ['استند موبایل', 'استند لپتاپ', 'لوازم اداری', 'پک اداری'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    const newProduct: Product = {
      id: product?.id || Date.now().toString(),
      name,
      description,
      price: parseInt(price),
      category,
      image: image || 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
      inStock,
      featured,
    };
    onSave(newProduct);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-lg my-8">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">
            {product ? 'ویرایش محصول' : 'افزودن محصول جدید'}
          </h3>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">نام محصول *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">توضیحات</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">قیمت (تومان) *</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">دسته‌بندی</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="flex items-center gap-1"><Image size={14} /> آدرس تصویر</span>
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
              dir="ltr"
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">موجود</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">محصول ویژه</span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              <Save size={16} />
              {product ? 'ذخیره تغییرات' : 'افزودن محصول'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;
