## Step 1: Initialize backend project folder

Created a new backend folder to hold Node.js, TypeORM, MySQL,
and authentication APIs for the Task Management application.

## Step 2: Initialize Node.js project
run: npm init -y

Initialize a new Node.js project with default settings automatically.

## Step 3: Install Express.js 
run: npm install express

Installed Express.js, which will be used to create HTTP APIs
for authentication and future task management features.

## Step 4: Install TypeScript
run: npm install -D typescript

Installed TypeScript as a development dependency to enable
type-safe backend development.

## Step 5: Generate tsconfig.json
run: npx tsc --init

Generated a default tsconfig.json file using the TypeScript CLI
to configure TypeScript for the backend project.


Now open tsconfig.json and update/add these settings
(TypeORM requires these):
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}


## Step 6: Install TypeORM and MySQL driver
run: npm install typeorm reflect-metadata mysql2

Installed TypeORM as the ORM for database interaction and
mysql2 as the MySQL database driver.
Also installed reflect-metadata which is required by TypeORM.

## Step 7: Create source folder and entry file
run: mkdir src

Created the src directory to hold all TypeScript source code.
Added index.ts as the application entry point.

Then Inside the src folder, create a file named: index.ts

## Step 8: Install core middleware
run: npm install cors
run: npm install -D @types/cors

Installed CORS to allow cross-origin requests from the frontend and Handling JSON requests.

Installed @types/cors to provide TypeScript type definitions
for the cors middleware and resolve implicit 'any' errors.

## Step 9: Install authentication libraries
run: npm install bcrypt jsonwebtoken

Installed bcrypt for securely hashing user passwords.
Installed jsonwebtoken to generate and verify JWT tokens
used for authentication.

## Step 10: Install TypeScript type definitions
run: npm install -D @types/express @types/bcrypt @types/jsonwebtoken @types/cookie-parser

Installed type definitions for Express, bcrypt, jsonwebtoken,
and cookie-parser to enable proper TypeScript type checking.

## Step 11: Install ts-node-dev
run: npm install -D ts-node-dev
npm install -D typeorm-ts-node-commonjs

ts-node-dev → runs apps

typeorm-ts-node-commonjs → runs TypeORM CLI

Installed ts-node-dev to run the TypeScript server in development
mode with automatic restart on file changes.

## Step 12: Add development script

Added a dev script to package.json to start the backend
using ts-node-dev with automatic reload support.

-- Open package.json and add this inside "scripts":
{
  "scripts": {
    "dev": "ts-node-dev --respawn src/index.ts"
  }
}

## Step 13: Install dotenv
run: npm install dotenv

Installed dotenv to manage environment variables using a .env file.
This helps keep sensitive configuration like database credentials
and JWT secrets out of the source code.

## Step 14: Create environment variables file

Created a .env file to store application configuration such as
server port, database credentials, and JWT secret.

-- In the project root (same level as package.json), create a file named: .env
Add exactly this content (you can adjust values later):

PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_NAME=task_manager

JWT_SECRET=supersecretjwtkey

Open src/index.ts
-- Add this line at the VERY TOP (first line): 
import "dotenv/config";


## Step 15: Configure TypeORM with MySQL

Created the TypeORM data source configuration to connect
the application with a MySQL database.
This will be used by all entities and repositories.

-- Inside src/, create a new file named: data-source.ts

Add exactly this code (you can change DB credentials according to yours):

import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // development only
  logging: false,
  entities: [],
});



## Step 16: Setup Express server

Configured a basic Express server with CORS, JSON parsing,
and cookie support. Connected the server to MySQL using
TypeORM and added a test route to verify the setup.

--Open src/index.ts and add exactly this code:

import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AppDataSource } from "./data-source";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed", error);
  });


## Step 17: Verify server startup
run: npm run dev

Started the development server and verified that the Express
application connects to MySQL successfully and runs without
TypeScript errors.

--You should see something like:
Database connected
Server running on port 3000


## ----------- Extra --------
## Step 18: Install Zod
run: npm install zod

Installed Zod for schema-based request validation to ensure
incoming data is properly validated.


## Step 19: Install http-status-codes
run: npm install http-status-codes

Installed http-status-codes to use named constants for HTTP
response statuses, improving readability and maintainability
of API responses.