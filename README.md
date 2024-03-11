
# Portfolio API

Portfolio API is my first backend written in Node.js, Express.js, and Mongoose. This API includes token authorization, password encryption, and many other features.


## Run Locally

Clone the project

```bash
  git clone https://github.com/damiantadla/portfolio-backend
```

Go to the project directory

```bash
  cd portfolio-backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node index.js
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_URL`

`PORT`

`ACCESS_TOKEN_SECRET`

# API Reference

## User

#### Endpoints

```http
  POST /user/login
  POST /user/logout 
  POST /auth/register
  POST /user/register
  GET /user/:id
```
#### Model
| Parameter | Type     | Options                |
| :-------- | :------- | :------------------------- |
| `firstName` | `String` | required : **true** |
| `lastName` | `String` | required : **true** |
| `email` | `String` | required : **true**, unique: **true** |
| `password` | `String` | required : **true**, minLength: **6** |
| `role` | `String` | default : **basic**  |

### Messenger

#### Endpoints

```http
  POST /messenger/send
  GET /messenger/get/:id
  GET /messenger/get
  DELETE /messenger/delete/:id
```
#### Model
| Parameter | Type     | Options                |
| :-------- | :------- | :------------------------- |
| `email` | `String` | required : **true** |
| `title` | `String` | required : **true** |
| `message` | `String` | required : **true** |
| `date` | `Date` | default : **Date.now**  |


## Projects

#### Endpoints

```http
  POST /projects/new
  GET /projects/get
  GET /projects/get/:id
  PUT /projects/edit/:id
  DELETE /projects/delete/:id
```
#### Model
| Parameter | Type     | Options                |
| :-------- | :------- | :------------------------- |
| `title` | `String` | required : **true** |
| `description` | `String` | required : **true** |
| `demo` | `String` | required : **true** |
| `urlImg` | `String` | required : **true** |
| `date` | `Date` | default : **Date.now**  |

## Portfolio

#### Endpoints

```http
  POST /portfolio/new
  GET /portfolio/get
  GET /portfolio/get/:id
  PUT /portfolio/edit/:id
  DELETE /portfolio/delete/:id
```
#### Model
| Parameter | Type     | Options                |
| :-------- | :------- | :------------------------- |
| `title` | `String` | required : **true** |
| `description` | `String` | required : **true** |
| `demo` | `String` | required : **true** |
| `urlImg` | `String` | required : **true** |
| `date` | `Date` | default : **Date.now**  |

## Authors

- [@Damian Tadla](https://www.github.com/damiantadla)

- Contact: damiantadla@gmail.com


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://katherineoelsner.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/)
