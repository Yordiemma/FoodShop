# FoodShop

A modern, responsive e-commerce web application for browsing and purchasing food products. Built with vanilla JavaScript and featuring a clean, user-friendly interface.

## Project Overview

This is a school project for designing FoodShop's landing page from scratch. The goal is to create a mobile-first landing page where users can browse products, add items to their cart, and discover current offers. The challenge focuses on creating a clear, intuitive mobile layout that highlights promotional offers without overwhelming users, while demonstrating good frontend practices with HTML/CSS and JavaScript interactions. A key part of the project involved user testing to validate the design and improve the user experience.

## Features

- **Shopping Cart** - Add products to cart with persistent storage using localStorage
- **Product Search** - Search for products and categories
- **Product Categories** - Browse products by category (Meat, Frozen, Beverages, etc.)
- **Sale Items** - View products currently on sale with discounted prices
- **Short Expiry Products** - Special section for products with short expiration dates
- **Often Bought Products** - Personalized recommendations based on purchase history
- **Offers Section** - Display special offers and promotions
- **Responsive Design** - Mobile-friendly interface with overlay cart
- **Modern UI** - Clean, intuitive design with smooth interactions

## Technologies Used

- **JavaScript (ES6 Modules)** - Vanilla JavaScript with modern ES6+ features
- **HTML5** - Semantic markup
- **CSS3** - Modular stylesheets with custom properties
- **Vite** - Fast build tool and development server
- **LocalStorage** - Client-side cart persistence

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd FoodShop
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the local development URL (typically `http://localhost:5173`)

## Key Functionality

### Shopping Cart
- Add/remove products from cart
- Adjust quantities with plus/minus buttons
- View total price and item count
- Cart persists across page refreshes using localStorage
- Discount calculations for sale items

### Product Display
- Multiple product sections (often bought, sale items, short expiry)
- Product cards with images, prices, and descriptions
- Sale price highlighting
- Category filtering

### Navigation
- Hamburger menu with categories
- Search
- Profile and order management links

## Development

The project uses ES6 modules for code organization. Each feature is separated into its own module for maintainability:

- **Cart Management**: `cart.js` handles cart state and localStorage
- **Rendering**: Separate render modules for different product sections
- **UI Interactions**: Event handlers in respective modules (menu, cart-overlay, etc.)

## Browser Support

Modern browsers that support:
- LocalStorage API
- CSS Custom Properties (CSS Variables)
