# 🛒 آذرپاش | فروشگاه محصولات فلزی

فروشگاه آنلاین مینیمال و حرفه‌ای برای محصولات فلزی شامل پایه استند موبایل، لپتاپ و لوازم اداری.

## 🚀 استقرار روی GitHub Pages

### روش اول: استفاده از GitHub Actions (توصیه شده)

1. یک ریپازیتوری جدید در GitHub بسازید
2. کد را به ریپازیتوری پوش کنید:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Azarposh Store"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

3. به تنظیمات ریپازیتوری بروید:
   - `Settings` → `Pages`
   - در بخش `Source`، گزینه `GitHub Actions` را انتخاب کنید

4. فایل workflow به صورت خودکار اجرا می‌شود و سایت شما در آدرس زیر قرار می‌گیرد:
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
   ```

### روش دوم: Deploy دستی

```bash
npm install
npm run build
```

سپس محتویات پوشه `dist` را به branch `gh-pages` پوش کنید.

---

## 🔐 دسترسی به پنل مدیریت

- آدرس: `/#/admin`
- رمز عبور: `azarpp1234`

> ⚠️ توجه: هیچ لینکی از پنل ادمین در هدر یا فوتر سایت وجود ندارد.

---

## 🛠️ تکنولوژی‌ها

- React 18
- TypeScript
- Vite
- Tailwind CSS v4
- React Router (Hash-based)
- Lucide Icons
- LocalStorage برای ذخیره داده‌ها

## 📁 ساختار پروژه

```
src/
├── components/
│   ├── Header.tsx      # هدر سایت
│   └── Footer.tsx      # فوتر سایت
├── context/
│   └── StoreContext.tsx # مدیریت state فروشگاه
├── pages/
│   ├── Home.tsx        # صفحه اصلی
│   ├── ProductDetail.tsx # جزئیات محصول
│   ├── Cart.tsx        # سبد خرید
│   ├── Admin.tsx       # پنل مدیریت
│   └── AdminLogin.tsx  # ورود ادمین
├── App.tsx
├── main.tsx
└── index.css
```

## ✨ امکانات

### فروشگاه:
- ✅ صفحه اصلی با محصولات ویژه
- ✅ فیلتر بر اساس دسته‌بندی
- ✅ جستجوی محصولات
- ✅ صفحه جزئیات محصول
- ✅ سبد خرید با مدیریت تعداد
- ✅ محاسبه هزینه ارسال
- ✅ طراحی کاملاً ریسپانسیو (RTL)

### پنل مدیریت:
- ✅ داشبورد با آمار
- ✅ افزودن محصول جدید
- ✅ ویرایش محصولات
- ✅ حذف محصولات
- ✅ جستجو در محصولات
- ✅ مدیریت تنظیمات سایت
- ✅ تغییر وضعیت موجودی و ویژه

---

## 📄 لایسنس

MIT
