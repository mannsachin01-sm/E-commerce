# E-Commerce Platform for Electronic Appliances (Techbaazar)

🚀 **[Live Demo Website](https://e-commerce-ten-ebon-42.vercel.app/)**

## Project Overview

This project focuses on developing an e-commerce platform Techbaazar dedicated to electronic appliances, designed to enhance user experience, streamline operations, and drive revenue growth for the company. The platform addresses the need for a modern, digital shopping solution tailored specifically to electronics customers.



 Table of Contents
1. [Problem Formulation](problem-formulation)
2. [System Features](system-features)
3. [Technology Stack](technology-stack)
4. [System Design](system-design)
5. [Setting Up the Project](setting-up-the-project)
6. [Testing & Implementation](testing--implementation)
7. [Conclusion](conclusion)
8. [Future Scope](future-scope)



 Problem Formulation

 1.1 Introduction

The company specializes in electronic appliances but lacks an online presence, leading to missed opportunities in a rapidly digitizing market. This project aims to bridge that gap by creating a dedicated e-commerce platform that caters specifically to electronic products.

 1.2 Problem Statement

The absence of an online platform restricts the company’s ability to compete in the modern retail landscape, where consumers demand fast, convenient, and secure online shopping options.



 System Features

1. User Registration  
   - Secure account creation and management.
   
2. Product Catalogue  
   - A comprehensive catalogue of electronic devices like smartphones, laptops, tablets, desktops, and smartwatches.
   
3. Advanced Search & Filtering  
   - Search by criteria like brand, price, and specifications to enhance user experience.

4. Shopping Cart  
   - Efficient product selection and handling.



 Technology Stack

 3.1 Frontend
- React  
  Responsive and dynamic UI for product browsing and customer interactions.
  
- Tailwind CSS  
  A utility-first CSS framework ensuring modern, responsive design.

 3.2 Backend
- Node.js with Express.js  
  Provides the backend infrastructure for handling routing, middleware, and APIs.

 3.3 Database
- MongoDB  
  A NoSQL database used to store user data, product listings.



 System Design

 4.1 Database Design
The database includes entities like:
- Users: Stores customer data such as login credentials.
- Products: Manages product details including prices, specifications, and stock.
- Cart: Captures products selected by customers, including quantities.

 4.2 Frontend Design
Wireframes and mockups were used to create an intuitive, user-friendly layout. Key sections include:
- Homepage: Displays featured products.
- Product Pages: Contains product details, reviews, and technical specifications.



 Setting Up the Project

Follow these steps to set up and run the e-commerce platform on your local environment:

 5.1 Prerequisites

- Node.js (v14+)
- MongoDB (running locally or on a cloud service like MongoDB Atlas)
- Git

 5.2 Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/mannsachin01-sm/E-commerce.git
   cd E-commerce
   ```

2. **Install Dependencies**
   * **Frontend:**
     ```bash
     cd frontend
     npm install
     ```
     *(If PowerShell script execution is disabled on Windows, use `npm.cmd install`)*
   * **Backend:**
     ```bash
     cd ../backend
     npm install
     ```
     *(If PowerShell script execution is disabled on Windows, use `npm.cmd install`)*

3. **Set Up Environment Variables**
   Create a `.env` file in the `backend` folder and add:
   ```env
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   PORT=5000
   ```

 5.3 Launching the Application

You can launch the frontend and backend servers automatically or manually:

#### Option A: Run Automatically (Windows Only)
A [run-project.bat](file:///C:/Users/SACHIN%20MANN/Documents/GitHub/E-commerce/run-project.bat) script is provided in the root directory. Double-click it or run the following in your terminal:
```powershell
.\run-project.bat
```

#### Option B: Run Manually (Separate Terminals)
* **Start Backend Server:**
  Open a terminal, navigate to the backend folder, and run:
  ```bash
  cd backend
  npm run dev
  ```
  *(On Windows/PowerShell, if script execution is disabled, use `npm.cmd run dev`)*
  
* **Start Frontend Server:**
  Open a second terminal, navigate to the frontend folder, and run:
  ```bash
  cd frontend
  npm run dev
  ```
  *(On Windows/PowerShell, if script execution is disabled, use `npm.cmd run dev`)*
  
  The website will open and run at: [http://localhost:5173/](http://localhost:5173/)

 Testing & Implementation

 6.1 Testing Methodology
- Unit Testing: Individual components such as login and search functionality are tested in isolation.
- Integration Testing: Testing the integration between frontend, backend, and database systems.
- User Acceptance Testing: Ensures the platform meets user expectations through real-world testing scenarios.

 6.2 Implementation Strategy
The platform is hosted on cloud services with secure SSL certification for transactions. Training sessions were held for administrators to manage orders and inventory.



 Conclusion

The e-commerce platform is a significant leap for the company, enabling them to cater to a broader, online customer base and streamline operations, leading to improved user experience and increased sales.



 Future Scope

1. Product Comparisons  
   Allow users to compare product features side by side.

2. Customer Reviews and Ratings  
   Foster community engagement by enabling users to share feedback.

3. Order Tracking  
   Implement real-time tracking for customer orders.

4. Secure Payment Integration  
   Expand payment gateways for smoother transactions.