🎬 Movie Database API

A simple and structured RESTful API built with Node.js, Express, Prisma ORM, and MySQL — designed to manage movies and users efficiently with schema validation using Zod.

🚀 Tech Stack

Backend Framework: Express.js

ORM: Prisma

Database: MySQL (Dockerized)

Validation: Zod

Runtime: Node.js (ESM Modules)

Security: bcrypt for password hashing

Error Handling: Custom ApiError and ApiResponse utilities

⚙️ Project Setup
1️⃣ Clone the repository
git clone https://github.com/ImDhairya/movie_database
cd movie-database

2️⃣ Install dependencies
npm install

3️⃣ Setup environment variables

Create a .env file in the root:

DATABASE_URL="mysql://root:root@localhost:3306/root"
PORT=5000

4️⃣ Run MySQL using Docker
docker compose up -d

5️⃣ Push Prisma schema to the database
npx prisma db push

6️⃣ Generate Prisma client
npx prisma generate

7️⃣ Start the server
npm run dev

📦 API Endpoints
🎥 Movies
Method Endpoint Description
POST /api/entries Add a new movie
GET /api/entries?page=1&limit=10 Get paginated movies
PATCH /api/entries/:id Update a movie
DELETE /api/entries/:id Delete a movie
👤 Users
Method Endpoint Description
POST /api/users Register a new user
🧠 Validation (Zod)

All routes are validated using Zod schemas before hitting controllers — ensuring clean and predictable data.

🗄️ Project Structure
src/
├── controllers/
│ ├── movies.controller.js
│ └── users.controller.js
├── routes/
│ ├── movies.routes.js
│ └── users.routes.js
├── middleware/
│ └── validate.js
├── db/
│ └── dbConnect.js
├── utils/
│ ├── api-error.js
│ ├── api-response.js
│ └── validators.js
├── app.js
└── index.js

🧰 Utilities

asyncHandler: Wraps async controllers to handle errors cleanly.

ApiError: Standardized error responses.

ApiResponse: Uniform success responses.

💡 Example Request
➤ Create Movie
POST /api/entries
Content-Type: application/json

{
"title": "Inception",
"type": "Movie",
"director": "Christopher Nolan",
"budget": 160000000,
"location": "Los Angeles",
"duration": 148,
"year": 2010,
"userId": 1
}

🧑‍💻 Development Commands
Command Description
npm run dev Run the app in development mode
npx prisma studio View and edit DB records visually
npx prisma generate Regenerate Prisma client
docker compose up -d Start MySQL via Docker
📜 License

This project is licensed under the MIT License.
