import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAdmin } = useStore();
  const navigate = useNavigate();

  if (isAdmin) {
    navigate('/admin');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin');
    } else {
      setError('رمز عبور اشتباه است');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">ورود به پنل مدیریت</h1>
          <p className="text-sm text-gray-500 mt-1">آذرپاش</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">رمز عبور</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="رمز عبور را وارد کنید"
                className="w-full px-4 py-3 pr-10 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500 mb-4">{error}</p>
          )}

          <button
            type="submit"
            className="w-full px-6 py-3 bg-gray-900 text-white rounded-xl font-medium text-sm hover:bg-gray-700 transition-colors"
          >
            ورود
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
