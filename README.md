**Semina** is a full-stack web application for managing and attending events, built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.

The platform is designed to support multiple roles **Owner, Organizer, Admin, and Participant** each with their own responsibilities in managing events and transactions.

## 🚀 Technologies Used

* **MongoDB** – NoSQL database for flexible data storage
* **Express.js** – Backend framework for building RESTful APIs
* **React.js** – Frontend library for building interactive user interfaces
* **Node.js** – JavaScript runtime environment
* **JWT Authentication** – Secure authentication system
* **REST API** – Communication between frontend and backend

---

## 🎯 Features

### 👑 Owner (CMS)

* Manage **organizers** (create, read, update, delete, and filter)
* Approve submitted **events**
* Manage **orders** with filtering by date and event

---

### 🏢 Organizer (CMS)

* Manage **users** (CRUD)
* Manage **categories** (CRUD)
* Manage **events** (CRUD & filtering)
* Manage **ticket categories** within events
* Manage **payment methods** for events
* Manage **orders** with filtering by date and event

---

### 🛠️ Admin

* Manage **orders** with filtering by date and event

---

### 👤 Participant

* Register, login, and forgot password
* Browse **events**
* View **event details**
* Perform **checkout / order tickets**
* View **order history**

---

## 🧩 Application Flow

| Role        | Action                                            |
| ----------- | ------------------------------------------------- |
| Owner       | Manage organizers                                 |
| Owner       | Approve events                                    |
| Owner       | Manage orders                                     |
| Organizer   | Manage users                                      |
| Organizer   | Manage categories                                 |
| Organizer   | Manage events                                     |
| Organizer   | Manage ticket categories                          |
| Organizer   | Manage payments                                   |
| Organizer   | Manage orders                                     |
| Admin       | Manage orders                                     |
| Participant | Authentication (register, login, forgot password) |
| Participant | View events                                       |
| Participant | View event details                                |
| Participant | Checkout tickets                                  |
| Participant | View order history                                |

---

## 💡 Future Improvements

* Payment gateway integration (Midtrans, Xendit, etc.)
* Email notifications
* Role-based dashboard UI enhancement

---
