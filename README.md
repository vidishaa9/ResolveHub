# ResolveHub
# 🚀 ResolveHub – AI Smart Complaint Management System

ResolveHub is a backend REST API built using **Spring Boot** that allows users to submit complaints and automatically classifies them using **AI + rule-based fallback logic**.

---

## 📌 Features

* 📝 Submit complaints via REST API
* 🤖 AI-based complaint classification
* 🧠 Hybrid system (AI + rule-based fallback)
* 📊 Categorization into multiple real-world domains
* ⚡ Priority detection (Low / Medium / High)
* 🗄️ PostgreSQL database integration
* 🔍 Retrieve all complaints
* 🔄 Update complaint status

---

## 🧠 AI Classification

The system classifies complaints into:

* Network
* Billing
* Technical
* Service
* Account
* Delivery
* Security
* Feedback
* Other

### 🔥 Hybrid Approach

If AI fails or is unavailable:

➡️ System automatically switches to **rule-based classification**
➡️ Ensures **100% reliability**

---

## 🛠️ Tech Stack

* Java 17
* Spring Boot
* Spring Data JPA
* PostgreSQL
* REST APIs
* Hugging Face API (Free AI Integration)
* Lombok

---

## ⚙️ Project Structure

```
src/main/java/com/vidisha/resolvehub
│
├── controller       # REST Controllers
├── service          # Business Logic (AI + fallback)
├── repository       # Database layer
├── model            # Entity classes
├── dto              # Request/Response DTOs
├── exception        # Custom exceptions
```

---

## 🔑 API Endpoints

### ➤ Create Complaint

```
POST /api/complaints
```

**Request:**

```json
{
  "description": "My internet is not working"
}
```

**Response:**

```json
{
  "category": "Network",
  "priority": "High",
  "status": "OPEN"
}
```

---

### ➤ Get All Complaints

```
GET /api/complaints
```

---

### ➤ Update Complaint Status

```
PUT /api/complaints/{id}?status=RESOLVED
```

---

## 🗄️ Database Configuration

Update `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/Complaints
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
```

---

## 🤖 AI Configuration

Add your Hugging Face API key:

```properties
huggingface.api.key=YOUR_API_KEY
```

---

## 🚀 How to Run

1. Clone the repository

```
git clone https://github.com/your-username/resolvehub.git
```

2. Open in IntelliJ / Eclipse

3. Configure database & API key

4. Run the application

5. Test APIs using Postman

---

## 💡 Key Highlights

* AI-powered backend system
* Production-level fallback strategy
* Clean architecture (Controller → Service → Repository)
* Error handling using custom exceptions
* Resume-ready project

---

## 🎯 Future Enhancements

* 📧 Email notifications
* 📊 Admin dashboard
* 🔐 Authentication & Authorization
* 📈 Complaint analytics
* 🤖 AI-based auto-replies

---

## 👩‍💻 Author

**Vidisha**

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
