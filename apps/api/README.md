# Tekken API (MVP)

## Endpoints

- **GET /healthz**  
  Returns 200 OK if the API is running.

- **POST /auth/signup**  
  Request: `{email, password}`  
  Response: `{id, token}`

- **POST /auth/login**  
  Request: `{email, password}`  
  Response: `{token}`

- **GET /community/posts**  
  Returns an array of posts.

- **POST /community/posts**  
  Request: `{title, body?}`  
  Response: `{id, ...}`