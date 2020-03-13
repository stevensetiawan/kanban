1.POST / user / login

Example Input (Request Body):

{
    "email": "test@mail.com",
    "password": "test"
}

Response (200):

    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiZXhwYW1wbGVAZXhhbXBsZS5jb20iLCJpYXQiOjE1ODM1NjQyODF9.jvh2CegZlsax09Cp_wcSiOed_84BUJTHJuC1IDAiTXs"

    Response ERROR (400):

{
	{message: "User or password wrong"}
}

2. POST / user / register

Example Input (Request Body):

{
    "email": "test@mail.com",
    "password": "test"
}

Response (200):

{
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiZXhwYW1wbGVAZXhhbXBsZS5jb20iLCJpYXQiOjE1ODM1NjQyODF9.jvh2CegZlsax09Cp_wcSiOed_84BUJTHJuC1IDAiTXs"
}

	
Response ERROR (400):

{
	{message: register fail}
}

Kanban

Url	        Method	Description
/kanban/	POST	Menambahkan data task baru
/kanban/	GET	    Menampilkan task list
/kanban/:id	GET	    Menampilkan task list berdasarkan id
/kanban/:id	PUT	    Melakukan update task
/kanban/:id	DELETE	Menghapus task dari list


1. POST /kanban

Example Input (Request Headers):

{
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8oi0tgA

}

Example Input (Request Body):

{
	"title" : "test",
	"description" : "coba test",
    "status": "backlog"
}

Response (200):

{
    "title": "test",
    "description": "coba test",
    "status": "backlog",
    "UserId": 1
}

Response ERROR (400):

{
	{message: cannot add data}
}

2. GET /tasks

Example Input (Request Headers):

{
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8oi0tgA

}

Response (200):

{
    "title": "test",
    "description": "coba test",
    "status": "backlog",
    "createdAt": "2020-03-07T07:15:12.149Z",
    "updatedAt": "2020-03-07T07:15:12.149Z",
    "UserId": 1
}
Response ERROR (404):

{
	"message:data is not found"
}

3. GET /tasks/:id

Example Input (Request Headers):

{
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8oi0tgA
}

Response (200):

{
    "id": 1,
    "title": "test",
    "description": "coba test",
    "status": "backlog",
    "createdAt": "2020-03-07T07:15:12.149Z",
    "updatedAt": "2020-03-07T07:15:12.149Z",
    "UserId": 1
}

Response ERROR (404):

{
	"data is not found"
}

4. PUT /tasks/:id
Example Input (Request Headers):

{
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8oi0tgA
}

Example Input (Request Body):

{
	"title" : "cobain",
	"description" : "cobain2",
	"status" : "product",
    "createdAt": "2020-03-07T07:15:12.149Z",
    "updatedAt": "2020-03-07T07:15:12.149Z",
    "UserId": 1

}
Response (200):

{
    "title" : "cobain",
	"description" : "cobain2",
	"status" : "product",
    "UserId": 1

}
Response ERROR (404):

	"update fail"

5. DELETE /tasks/:id

Example Input (Request Headers):

{
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8oi0tgA
}

Response (200):

{
    "id": 1,
    "title": "coba",
    "description": "coba2",
    "status": "product",
    "createdAt": "2020-03-07T07:15:12.149Z",
    "updatedAt": "2020-03-07T07:20:48.109Z",
    "UserId": 1
}

Response ERROR (404):

{
	"DELETE is fail"
}