
# Cashfree Payment Integration

This project demonstrates how to integrate **Cashfree Payment Gateway** in a web application. The implementation supports creating payment sessions, initializing payments, and verifying payment statuses. It uses **Node.js** on the backend and integrates with a frontend application.

---

## Features
1. **Create Payment Session**  
   Generate a payment session on the server using Cashfree's SDK.
2. **Initiate Payment**  
   Load the Cashfree checkout experience using the client application.
3. **Verify Payment**  
   Verify the payment status and store it in the database.

---

## Workflow

### 1. **Client-Side Workflow**
- **Initiate Payment**
  - The `handlePayment` function sends a request to create a Cashfree session and initializes the payment.
- **API Calls**
  - **`createCfSession`**: Creates a payment session on the server.
  - **`verifyCfPayment`**: Verifies the payment after it is completed.

### 2. **Server-Side Workflow**
- **Create Payment Session**
  - Uses `Cashfree.PGCreateOrder` to create a session.
- **Verify Payment**
  - Uses `Cashfree.PGOrderFetchPayments` to fetch payment details and logs the result.

---

## Setup Instructions

### 1. Prerequisites
- **Node.js** installed on your machine.
- **MongoDB** for database storage.
- **Cashfree Account** for API credentials.

### 2. Clone Repository
```bash
git clone https://github.com/Rajdiwate/Razorpay-MERN.git
cd Razorpay-MERN


### 3. Install Dependencies
```bash
npm install
```

### 4. Add Environment Variables
Create a `.env` file in the root directory with the following:
```env
PORT=8000
MONGO_URI=<your-mongodb-uri>
CASHFREE_APP_ID=<your-cashfree-app-id>
CASHFREE_SECRET=<your-cashfree-secret>
```

### 5. Start the Server
```bash
npm start
```

---

## API Endpoints

### 1. **Create Payment Session**
- **Endpoint**: `/cf/create-session`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "amount": 100,
    "number": "9876543210"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "session": {
      "payment_session_id": "<session-id>"
    }
  }
  ```

### 2. **Verify Payment**
- **Endpoint**: `/cf/verifyPayment`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "order_id": "<order-id>"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "payment_status": "SUCCESS",
      "cf_payment_id": "<payment-id>"
    }
  }
  ```

---

## Key Files

### 1. `ConfirmPayment.jsx`
- Contains client-side payment initialization logic.

### 2. `cashfree.controller.js`
- Contains the backend logic for creating sessions and verifying payments.

### 3. `index.js`
- Entry point for the server and Cashfree configuration.

---

## Important Notes
1. Ensure you set `Cashfree.Environment.SANDBOX` for testing and switch to `Cashfree.Environment.PRODUCTION` when deploying to production.
2. Ensure you set `mode="sandbox"` for testing and switch to `mode="production` when deploying to production in ConfirmPayment.jsx file.
3. Replace `<your-mongodb-uri>`, `<your-cashfree-app-id>`, and `<your-cashfree-secret>` in `.env` with your credentials.

---


