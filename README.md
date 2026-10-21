Student Records API
A simple REST API made with Node.js and Express.js to manage student records.
Technologies
- Node.js
- Express.js
- Postman
- GitHub
- Render

How to Run
1. Install Node.js.
2. Open the project folder in the terminal.
3. Run npm install.
4. Run npm start.
5. Open http://localhost:3000/.
   
API Endpoints
Method	Endpoint	Purpose
GET	/api/students	Get all students
GET	/api/students/:id	Get one student
POST	/api/students	Add a student
PUT	/api/students/:id	Update a student
DELETE	/api/students/:id	Delete a student


Example Request
For POST /api/students, choose Body → raw → JSON in Postman:
{
  "name": "Cyrus",
  "course": "BSIT",
  "year": 3
}
The name and course are required. The year must be a number from 1 to 5. The API returns an error if the data is invalid or the student ID does not exist.
Project Links
- GitHub: https://github.com/fabricanteangelo4-eng/student-record-api
- Render: https://student-record-api-1-t6nu.onrender.com
