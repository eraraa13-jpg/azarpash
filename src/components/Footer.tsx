import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-gray-900 to-gray-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">آ</span>
              </div>
              <span className="text-xl font-bold text-gray-900">آذرپاش</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              تولیدکننده محصولات فلزی با کیفیت. پایه‌های استند موبایل، لپتاپ و لوازم اداری با طراحی مینیمال و مدرن.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">محصولات</h4>
            <ul className="space-y-2">
              <li><Link to="/?category=استند موبایل" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">استند موبایل</Link></li>
              <li><Link to="/?category=استند لپتاپ" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">استند لپتاپ</Link></li>
              <li><Link to="/?category=لوازم اداری" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">لوازم اداری</Link></li>
              <li><Link to="/?category=پک اداری" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">پک اداری</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">خدمات</h4>
            <ul className="space-y-2">
              <li><span className="text-sm text-gray-500">ارسال سریع</span></li>
              <li><span className="text-sm text-gray-500">ضمانت اصالت کالا</span></li>
              <li><span className="text-sm text-gray-500">پشتیبانی ۲۴ ساعته</span></li>
              <li><span className="text-sm text-gray-500">گارانتی تعویض</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">تماس با ما</h4>
            <ul className="space-y-2">
              <li><span className="text-sm text-gray-500">۰۲۱-۱۲۳۴۵۶۷۸</span></li>
              <li><span className="text-sm text-gray-500">info@azarposh.ir</span></li>
              <li><span className="text-sm text-gray-500">تهران، خیابان ولیعصر</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-400">
            © ۱۴۰۳ آذرپاش. تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
