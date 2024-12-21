# Restaurant-app

Restaurant App is an application designed to efficiently manage restaurant orders. It includes features like login, menu management, and order creation, all from a user-friendly and modern interface.

---

## Installation and Setup

### **Frontend**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/restaurant-app.git
   cd restaurant-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### **Backend**
1. Clone the backend repository (if separate):
   ```bash
   git clone https://github.com/your-username/restaurant-backend.git
   cd restaurant-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file with the following keys:
     ```env
     MONGO_URI=<your-mongodb-uri>
     JWT_SECRET=<your-secret-key>
     PORT=5000
     ```

4. Start the server:
   ```bash
   npm run start
   ```

---

## How to Use the App

### Access the App
- Public URL: **Pending**
- **Test Credentials**:
  - User: Select a restaurant and a waiter.
  - Password: `1234`

### Key Features
1. **Login**:
   - Select a restaurant.
   - Select a waiter.
   - Enter the password `1234` to log in.

2. **Dashboard**:
   - View available menus.
   - Add products to orders.

3. **Order Management**:
   - Review order totals.
   - Submit orders to the system.

---

## Technologies Used

### **Frontend**
- [Next.js](https://nextjs.org/): React framework for modern web apps.
- [TailwindCSS](https://tailwindcss.com/): CSS framework for rapid and responsive styling.
- [Jest](https://jestjs.io/) and [Testing Library](https://testing-library.com/): For unit and integration testing.

### **Backend**
- [Node.js](https://nodejs.org/): JavaScript runtime for backend development.
- [Express.js](https://expressjs.com/): Framework for building APIs.
- [MongoDB](https://www.mongodb.com/): NoSQL database for data management.

---

## Public Link

- **[Access the App](#)** (Deployment Pending)

---

## Testing Notes
- The app is set up with `Jest` and `Testing Library` for simple tests.
- Ensure the backend is running before testing API-dependent features.
- Use the password `1234` for login.

---

## Future Enhancements
There are some features that I would like to implement in the future:
- Implement a role-based system for administrators.
- Add support for multiple languages.
- Enhance design and animations for a better user experience.
- Integrate a notification system.
- Add an order checkout feature.

---

Feedback and suggestions to improve this app are always welcome. Thank you for trying out Restaurant App!
