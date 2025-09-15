# Tekken API (MVP)
- GET /healthz → 200
- POST /auth/signup {email,password} → {id, token}
- POST /auth/login {email,password} → {token}
- GET /community/posts → []
- POST /community/posts {title, body?} → {id,...}
