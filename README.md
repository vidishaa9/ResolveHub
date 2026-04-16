🚀 ResolveHub
AI-Powered Complaint Management System

ResolveHub is a Spring Boot REST API that automatically classifies user complaints using AI with a rule-based fallback system, ensuring reliable and intelligent categorization.

✨ Features
📝 Submit complaints via REST API
🤖 AI-based automatic classification
🧠 Rule-based fallback (100% reliability)
⚡ Priority detection (Low / Medium / High)
🗄️ PostgreSQL integration
🔄 Update complaint status
📊 View all complaints
🧠 Categories

Network
• Billing 
• Technical 
• Service
• Account
• Delivery 
• Security 
• Feedback 
• Other

🛠 Tech Stack

Java 17 
• Spring Boot
• Spring Data JPA 
• PostgreSQL 
• REST API 
• Hugging Face API
• Lombok

📡 API Endpoints
➤ Create Complaint

POST /api/complaints

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

➤ Update Status

PUT /api/complaints/{id}?status=RESOLVED

⚙️ Setup
1. Clone
git clone https://github.com/your-username/resolvehub.git
2. Configure DB
spring.datasource.url=jdbc:postgresql://localhost:5432/Complaints
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update
3. Add AI Key
huggingface.api.key=YOUR_API_KEY
4. Run Project
mvn spring-boot:run
💡 Highlights

✔ AI + fallback hybrid system
✔ Clean layered architecture
✔ Production-ready design
✔ Easy to extend

👩‍💻 Author

Vidisha

⭐ If you like this project

Give it a star ⭐
