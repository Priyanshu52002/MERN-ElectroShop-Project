# MERN ElectroShop Project

MERN ElectroShop is a full-stack e-commerce web application for an electronics store, built using the **MERN stack** (MongoDB, Express.js, React.js, and Node.js). The platform allows users to browse, filter, and purchase electronics such as Smart Phones, Laptops, Speakers, and Headphones. The project incorporates a clean and modern UI with Tailwind CSS, and features include a product cart, Stripe payment integration, user authentication, and an admin panel for managing products.

## Features

- **Product Management:** Admins can create, update, and delete products directly from the dashboard.
- **Category Filtering:** Users can filter products by categories such as **Smart Phones**, **Laptops**, **Speakers**, and **Headphones**.
- **Shopping Cart:** Users can add, remove, and manage items in the cart, with cart state synchronized via `localStorage`.
- **Stripe Payment Integration:** Secure payments powered by Stripe, with support for INR transactions.
- **User Authentication:** JWT-based authentication for secure login and registration, with role-based access for admins and users.
- **Responsive Design:** Fully responsive layout using **Tailwind CSS**, optimized for all screen sizes.
- **Theme Toggle:** Switch between dark and light mode with a customizable theme toggle.

## Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Payment Gateway:** Stripe API
- **Authentication:** JWT, bcryptjs
- **Image Uploads:** Cloudinary API

## Getting Started

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Priyanshu52002/MERN-ElectroShop-Project.git
### INSTALL DEPENDENCIES
 ```bash
 cd MERN-ElectroShop-Project
 npm install
 cd client
 npm install
```
#Configure environment variables for the backend (MongoDB, Cloudinary, Stripe, etc.).

### Run the dev enviornment
```bash
npm run dev
