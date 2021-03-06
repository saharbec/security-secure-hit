# Full stack login system

This project is a part of an academic course.
We were tasked to simulate the differences between a vulnerable and a secured implementation of similar web servers.

# Running The project locally

## Certificate Generation

In order to run this project you need to generate certificate.
You can generate certificate using the following OpenSSL commands:

- `From root directory: mkdir cert && cd cert`
- `openssl genrsa -out key.pem`
- `openssl req -new -key key.pem -out csr.pem`
- `openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem`
- `rm csr.pem`

For further explanation you can visit https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/

---

1. Start the DB (./db-docker)
2. Start the backend (./backend)
3. Start the frontend (./frontend)

## Set Environment Variables

- PORT - Server port
- CLIENT_URL - Base front URL
- DB_USER - MySQL Database user name
- DB_HOST - MySQL host
- DB_PASSWORD - MySQL password
- DB_NAME - Name of the database
- EMAIL_ADDRESS - Outlook email address for maintanance purposes (Password reset)
- EMAIL_PASSWORD - Password for the `EMAIL_ADDRESS`
- TOKEN_KEY - Secret key for `JWT` (JSONWebToken)

