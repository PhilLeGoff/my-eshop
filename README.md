```markdown
# IPSSI'SHOP Frontend

This is the frontend repository for IPSSI'SHOP, a full-stack e-commerce application. The frontend is built with React, using React Query, React Router, Tailwind CSS, and React Hook Form with yup for form validation.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- **User Authentication:** Login and sign up pages with JWT-based auth.
- **Product Browsing:** Public product listing and detail pages.
- **Basket Functionality:** Users can add products to their basket.
- **Admin Dashboard:** Admin-specific routes for product management.
- **Product Forms:** Modals with React Hook Form & yup for product creation and editing.
- **Fixed & Transparent Header:** A responsive fixed header with a transparent background that overlays content on scroll.
- **Responsive Design:** Optimized for desktop and mobile.

## Project Structure

frontend/ ├── src/ │ ├── assets/ │ │ ├── default.jpg │ │ └── dress.png # Favicon or custom tab picture │ ├── components/ │ │ ├── AddProductModal.jsx │ │ ├── AdminProductCard.jsx │ │ ├── BasketModal.jsx │ │ ├── DefaultRoute.jsx │ │ ├── EditProductModal.jsx │ │ ├── Header.jsx │ │ ├── ProtectedRoute.jsx │ │ ├── AdminRoute.jsx │ │ └── VerySmallCard.jsx │ ├── context/ │ │ └── AuthContext.js │ ├── pages/ │ │ ├── AdminDashboard.jsx │ │ ├── Login.jsx │ │ ├── ProductDetail.jsx │ │ ├── Products.jsx │ │ └── SignUp.jsx │ ├── routes/ │ │ └── AppRoutes.jsx │ ├── services/ │ │ ├── productService.js │ │ ├── productsApi.js │ │ └── userService.js │ ├── App.jsx │ ├── index.css │ └── main.jsx ├── package.json └── .env


## Prerequisites

- **Node.js** (v14 or higher recommended)
- **npm** (v7+ recommended) or **Yarn**

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://your-frontend-repo-url.git
   cd frontend

    Set Up Environment Variables:

    Create a .env file in the frontend folder with the following content:

VITE_API_URL=http://localhost:3000/api

Install Dependencies:

Using Yarn:

yarn install

Or using npm (v7+):

    npm install --legacy-peer-deps

Running the Application

Start the development server with:

yarn dev

(Or use npm run dev if you prefer npm.)
Environment Variables

    VITE_API_URL: URL of the backend API (e.g., http://localhost:3000/api).

Technologies Used

    React
    React Query
    React Router
    Tailwind CSS
    React Hook Form & yup (for form validation)
    Font Awesome (for icons)

License

This project is licensed under the MIT License.