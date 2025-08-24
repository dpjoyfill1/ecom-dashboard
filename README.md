# E-Commerce Dashboard

A modern, responsive e-commerce dashboard built with Next.js, TypeScript, and Tailwind CSS. Features product browsing, search, filtering, cart functionality, and dark/light mode theming.

![E-Commerce Dashboard](https://img.shields.io/badge/Next.js-15.5.0-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat&logo=tailwindcss)

## ✨ Features

### Core Functionality
- 📱 **Product Listing**: Responsive grid layout with product cards
- 🔍 **Search & Filter**: Real-time search with category filtering
- 📊 **Sorting**: Sort by price (asc/desc) and name (A-Z/Z-A)
- 🛒 **Shopping Cart**: Add items to cart with localStorage persistence
- 📦 **Product Details**: Detailed product view with ratings and descriptions
- 🌓 **Theme Toggle**: Dark/Light mode with persistence

### Technical Features
- ⚡ **Server-Side Rendering**: Built with Next.js 15 App Router
- 🎨 **Responsive Design**: Mobile-first approach with CSS Grid/Flexbox
- 🔄 **Real-time Updates**: Debounced search and instant filtering
- 💾 **State Persistence**: Cart and theme preferences saved in localStorage
- 🎯 **Error Handling**: Comprehensive error boundaries and retry mechanisms
- ⏳ **Loading States**: Skeleton loaders and smooth transitions
- 🧪 **TypeScript**: Full type safety throughout the application

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecom-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
ecom-dashboard/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Product listing page
│   │   ├── product/[id]/      # Dynamic product detail pages
│   │   └── globals.css        # Global styles and theme
│   ├── components/            # Reusable UI components
│   │   ├── Header.tsx         # Navigation header
│   │   ├── ProductCard.tsx    # Product display card
│   │   ├── SearchAndFilter.tsx # Search and filtering
│   │   ├── Loading.tsx        # Loading states
│   │   ├── Error.tsx          # Error handling
│   │   └── ClientLayout.tsx   # Client-side layout wrapper
│   ├── context/               # React Context providers
│   │   ├── CartContext.tsx    # Shopping cart state
│   │   ├── ThemeContext.tsx   # Theme management
│   │   └── Providers.tsx      # Combined providers
│   ├── lib/                   # Utilities and API
│   │   ├── api.ts            # Fake Store API integration
│   │   └── utils.ts          # Helper functions
│   └── types/                 # TypeScript definitions
│       └── index.ts          # Shared type definitions
├── public/                    # Static assets
├── tailwind.config.ts        # Tailwind CSS configuration
├── next.config.ts            # Next.js configuration
└── package.json              # Dependencies and scripts
```

## 🎨 Key Components

### Product Listing
- Responsive grid layout (1-4 columns based on screen size)
- Real-time search with debouncing
- Category filtering
- Price and name sorting
- Loading skeletons

### Product Detail
- High-resolution product images
- Star ratings and review counts
- Quantity selector
- Add to cart functionality
- Breadcrumb navigation

### Shopping Cart
- Persistent storage in localStorage
- Cart item counter in header
- Add/remove items
- Quantity management

### Theme System
- Dark/Light mode toggle
- Automatic system preference detection
- Smooth transitions
- Persistent theme selection

## 🌐 API Integration

This project uses the [Fake Store API](https://fakestoreapi.com/) for product data:

- **Products**: `GET /products` - Fetch all products
- **Product Detail**: `GET /products/{id}` - Get single product
- **Categories**: `GET /products/categories` - Get all categories
- **Category Products**: `GET /products/category/{category}` - Filter by category

## 🎯 Features Breakdown

### Search & Filter
- **Search**: Real-time search across product titles and descriptions
- **Category Filter**: Filter products by category (electronics, jewelry, etc.)
- **Sorting**: Multiple sorting options (price, name, ascending/descending)
- **Active Filters**: Visual indication of applied filters with quick removal

### Cart Management
- **Add to Cart**: From product detail page with quantity selection
- **Persistence**: Cart data saved in localStorage
- **Counter**: Live cart item count in header
- **Error Handling**: Graceful handling of storage errors

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: 
  - Mobile: 1 column
  - Tablet: 2 columns  
  - Desktop: 3-4 columns
- **Touch Friendly**: Large click targets and smooth interactions

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy with Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Deploy automatically

3. **Environment Setup**
   - No environment variables needed for this project
   - The app uses the public Fake Store API

### Netlify

1. **Build Command**: `npm run build`
2. **Publish Directory**: `.next`
3. **Node Version**: 18+

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Code Quality
- **ESLint**: Configured with Next.js recommended rules
- **TypeScript**: Strict type checking enabled
- **Prettier**: Code formatting (can be added)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Fake Store API](https://fakestoreapi.com/) for providing the product data
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Heroicons](https://heroicons.com/) for the beautiful icons

## 📞 Support

If you have any questions or run into issues, please:
1. Check the existing [Issues](../../issues)
2. Create a new issue with detailed information
3. Contact the maintainers

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
