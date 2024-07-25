Backend (Express.js):

Database: MongoDB, with Mongoose ODM for managing models and schemas.
Authentication: JWT-based authentication for secure user login and registration, with bcryptjs for password hashing.
Routes: RESTful API routes for handling products, users, subscriptions, and Stripe payments.
File Uploads: Integration with Cloudinary for image storage, using multer for handling file uploads.
Payment Processing: Stripe integration for handling payments, balances, and checkout sessions.
Environment Configuration: dotenv for managing environment variables.


Frontend (React.js):

Routing: React Router for navigation between different pages.
State Management: Context API for managing global states like cart and user authentication status.
Styling: Tailwind CSS for a clean and modern design, with custom components for a consistent look and feel.
Notifications: notistack for displaying toast notifications.


Third-Party Integrations:

Cloudinary: For storing and managing uploaded images.
Stripe: For payment processing, including creating checkout sessions and retrieving account stats.
JWT & bcryptjs: For secure user authentication and authorization.
