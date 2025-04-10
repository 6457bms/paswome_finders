# **App Name**: Pawsome Finds

## Core Features:

- Product Carousel: Display a visually appealing carousel of images as a product gallery on the landing page, showcasing a few high-selling products and some default products.
- Product Listing: List all available products in a clean, organized view on the products page, with filtering and sorting options.
- Product Details: Display detailed product information (description, price, images, options) on a dedicated product details page.
- Payment Processing: Handle secure payment processing using a reliable payment gateway.
- Inventory Management: Allow admin users to manage inventory (add, edit, delete products) using a simple Excel file integration with Firestore database.
- Login Page: Provide a form for users to log in with email and password, with validation for credentials.
- Signup Page: Enable new users to register with a form for email, password, and basic details, with validation for input fields.
- Navbar: Implement a navigation bar with routing links to key pages (e.g., Home, Products, Cart, User Profile).
- Checkout Page: Shows cart items, user address input, and payment options.
- Contact Us Page: Display contact information and a form for users to send messages.
- FAQ Page: Display frequently asked questions with answers to address common queries.
- About Us Page: Display detailed information about the company, its mission, and its team.
- Order History Page: Allow users to view past orders, track shipments, and manage returns.

## Style Guidelines:

- Primary color: Teal (#008080) to evoke a sense of calm and trustworthiness.
- Secondary color: Charcoal gray (#36454F) for a sophisticated and modern feel.
- Accent: Blush pink (#F08080) to add a touch of warmth and playfulness, especially for pet-related items. Use trendy gradient combinations of these colors where appropriate.
- Use a grid-based layout for product listings to ensure a clean and organized presentation. Employ responsive design principles for optimal viewing on all devices.
- Utilize simple, modern icons for navigation, cart, and user profile elements. Ensure icons are consistent throughout the app.
- Incorporate subtle animations for transitions and interactions (e.g., adding items to the cart, loading new products) to enhance the user experience without being distracting.

## Original User Request:
Build a web app for selling products, including shirts, pet food, pet clothing, and pet items (primarily for dogs). The app must feature a modern, user-friendly UI, be fully responsive across all devices (mobile phones, tablets, laptops, desktops), and include the following features:

A clean title bar with a logo on the left, the app name, and a simple cart icon on the right displaying the cart item count.
Separate pages for:
Landing page: Features a visually appealing carousel of images as a product gallery, showcasing a few high-selling products (e.g., top 3-5) and some default products.
Products page: Lists all available products in a clean, organized view.
Product Details page: Displays detailed information (e.g., description, price, images, size/color options) when a user clicks a product from the products or landing page.
Checkout page: Shows cart items, user address input, and payment options.
Payments page: Handles secure payment processing.
User Details page: Allows users to view and edit their profile information (e.g., name, email, address) after logging in.
Login page: Provides a form for users to log in with email and password, with validation for credentials.
Signup page: Enables new users to register with a form for email, password, and basic details, with validation for input fields.
Admin page: Accessible only to users with an admin role, allowing them to:
Manage inventory (add, edit, delete products) using a simple Excel file integration.
View and manage user accounts (e.g., list users, update roles, delete accounts).
Robust form validations across all forms (e.g., login, signup, address, payment, admin inputs) with clear error messages for missing or invalid data (e.g., email format, password strength, required fields).
Easy inventory management using a simple Excel file for updating and tracking products, integrated into the admin page.
Support for shopping carts, payment processing, and storing user addresses.
A modern, maintainable design with a sophisticated color palette (e.g., muted tones, gradients, or trendy combinations like teal, charcoal, or blush—avoid simple orange).

use firestore database
  