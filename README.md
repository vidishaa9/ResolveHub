🚀 ResolveHub – AI Smart Complaint Management System

ResolveHub is a Spring Boot REST API that allows users to submit complaints and automatically classifies them using AI-based intelligence with a rule-based fallback system for reliability.

📌 Features
📝 Submit complaints via REST API
🤖 AI-based complaint classification
🧠 Hybrid system (AI + rule-based fallback)
📊 Categorization into real-world domains
⚡ Priority detection (Low / Medium / High)
🗄️ PostgreSQL database integration
🔍 Retrieve all complaints
🔄 Update complaint status
🧠 AI Classification

Complaints are classified into:

Network
Billing
Technical
Service
Account
Delivery
Security
Feedback
Other
🔥 Hybrid Approach

If AI service fails or is unavailable:

➡️ The system automatically switches to rule-based classification
➡️ Ensures 100% system reliability

🛠️ Tech Stack
Java 17
Spring Boot
Spring Data JPA
PostgreSQL
REST APIs
Hugging Face API
Lombok
⚙️ Project Structure
src/main/java/com/vidisha/resolvehub
│
├── controller   # REST Controllers
├── service      # Business Logic (AI + fallback)
├── repository   # Database layer
├── model        # Entity classes
├── dto          # Request/Response DTOs
├── exception    # Custom exceptions
🔑 API Endpoints
➤ Create Complaint

POST /api/complaints

Request:

{
  "description": "My internet is not working"
}

Response:

{
  "category": "Network",
  "priority": "High",
  "status": "OPEN"
}
➤ Get All Complaints

GET /api/complaints

➤ Update Complaint Status

PUT /api/complaints/{id}?status=RESOLVED

🗄️ Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/Complaints
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
🤖 AI Configuration
huggingface.api.key=YOUR_API_KEY
🚀 How to Run

Clone repository

git clone https://github.com/your-username/resolvehub.git
Open in IntelliJ / Eclipse
Configure PostgreSQL + API key
Run the application
Test APIs using Postman
💡 Key Highlights
AI-powered backend system
Production-level fallback strategy
Clean architecture (Controller → Service → Repository)
Exception handling with custom errors
Resume-ready project
🎯 Future Enhancements
📧 Email notifications
📊 Admin dashboard
🔐 Authentication & Authorization
📈 Complaint analytics
🤖 AI auto-replies

👩‍💻 Author
Vidisha

⭐ Support
If you like this project, give it a ⭐ on GitHub!
If you like this project, give it a ⭐ on GitHub!
