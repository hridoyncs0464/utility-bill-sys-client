# Utility Bill Management System

![Project Banner](https://images.unsplash.com/photo-1591696205602-89a7e208bfa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dGVhbHxlbnwwfHx8fDE2OTgyNzU3MDk&ixlib=rb-4.0.3&q=80&w=1080)

🎯 **Project Theme:**  
The Utility Bill Management System is a **MERN Stack-based web application** that allows users to view, manage, and pay monthly utility bills such as **Electricity, Gas, Water, and Internet**. Users can securely log in, pay only the current month bills, and update their bill information. The system also features **responsive UI, search/display functionalities, and PDF report download** for users’ paid bill history.

---

## 🔗 Live Website
[Click here to visit](https://payutilitybill.web.app/)

---

## 📌 Key Features

* **User Authentication:** Register, login, and Google social login for secure access.
* **Dynamic Bill Management:** View all bills, filter by category, and see detailed bill information.
* **Pay Bills:** Users can pay only the bills of the current month via a modal form.
* **My Paid Bills:** View all paid bills with options to update, delete, and download a PDF report.
* **Responsive UI:** Works seamlessly across desktop, tablet, and mobile devices.
* **Extra Features:** Loading spinners, toast notifications, dynamic titles, 404 page, and optional dark/light theme toggle.

---

## 🏗️ Layout Structure

* **Navbar:**
  * Before Login: Logo | Home | Bills | Login | Register
  * After Login: Logo | Home | Bills | My Pay Bills | Profile Avatar | Logout

* **Main Section:** Dynamic routing with React Router for different pages.

* **Footer:**
  * Logo / Site Name
  * Short Description
  * Copyright
  * Useful Links

---

## 🏠 Pages & Functionalities

### Home Page (Public)
* Banner section with an image slider/carousel.
* 4 category cards: Electricity, Gas, Water, Internet.
* Recent 6 bills displayed dynamically from MongoDB.
* Two additional meaningful sections for more information.

### Authentication
* **Login Page:** Email, Password, Forget Password, and Social Google login.
* **Registration Page:** Name, Email, Photo-URL, Password with validation (Uppercase, Lowercase, Minimum 6 characters).

### Bills Page (Public)
* Display all bills in a 3-column grid.
* Filter bills by category dynamically without page reload.
* “See Details” button navigates to bill details page.

### Bill Details Page (Private)
* Shows title, category, location, description, image, amount, date.
* **Pay Bill Button:** Enabled only for current month bills, opens a modal with pre-filled form.

### My Paid Bills Page (Private)
* Displays bills paid by the logged-in user in a table.
* Update and Delete functionalities with modals.
* Download PDF report of paid bills with **total amount** summary.

---

## ⚙️ Technologies Used

* **Frontend:** React.js, React Router, Tailwind CSS, DaisyUI, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** Firebase (Email & Google login)
* **Extras:** jsPDF + jsPDF-AutoTable, Lottie React, React Awesome Reveal

---

## 📂 Database Structure (MongoDB)

### Bills Collection
```json
{
  "title": "Frequent Power Outage in Mirpur",
  "category": "Electricity",
  "email": "creator@gmail.com",
  "location": "Mirpur-10, Dhaka",
  "description": "Power cuts occur daily in the evening.",
  "image": "https://example.com/power.jpg",
  "date": "2025-10-26",
  "amount": 260
}
MyBills Collection
{
  "billsId": "abc123",
  "username": "Mr. X",
  "phone": "017XXXXXXX",
  "address": "Dhaka",
  "email": "mrx@gmail.com",
  "amount": 260,
  "date": "2025-10-26"
}

🏃‍♂️ How to Run Locally
Client

Clone the repository:

git clone https://github.com/username/B12-A10-Category-0010.git


Navigate to client folder:

cd client


Install dependencies:

npm install


Create .env file with Firebase config & API base URL:

REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_API_BASE_URL=http://localhost:5000


Start client:

npm start


Open http://localhost:3000
 in your browser.

Server

Navigate to server folder:

cd server


Install dependencies:

npm install


Create .env file with:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000


Start server:

npm run dev

