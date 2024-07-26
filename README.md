## DEPLOYED LINK
[task_manager_voosh](https://task-manager-vooshi.vercel.app/login)

## Overview
- The Task Manager web app is a simple and intuitive application to manage tasks using three primary columns: TODO, In Progress, and DONE. This application allows users to view, add, update, and delete tasks, as well as drag and drop tasks between columns to track their progress.

## Features
Task Management: Create, update, and delete tasks.
Drag and Drop: Easily move tasks between TODO, In Progress, and DONE columns.
Task Details: View detailed information about each task.
Responsive Design: Compatible with various devices and screen sizes.
Tech Stack
Frontend: React, Next.js, Tailwind CSS
Backend: Firebase (Authentication, Firestore)
State Management: React Context API
Notifications: React-Toastify


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Getting Started
# Prerequisites
Node.js and npm or yarn: Ensure you have Node.js and npm (or yarn) installed. You can download Node.js from nodejs.org.

Firebase Account: Set up a Firebase project and configure authentication and Firestore. Follow the Firebase documentation for setup.

## Installation
1. Clone the Repository
git clone <repository-url>
cd <repository-directory>
2. Install Dependencies
npm install
# or
yarn install
3. Configure Firebase
Create a .env.local file in the root directory of your project and add your Firebase configuration:
NEXT_PUBLIC_FIREBASE_API_KEY=<your-api-key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-auth-domain>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-messaging-sender-id>
NEXT_PUBLIC_FIREBASE_APP_ID=<your-app-id>
4. Run the Development Server
npm run dev
# or
yarn dev
Open your browser and go to http://localhost:3000 to see the application in action.

## Usage
1. Login/Register: Use the authentication options to log in or register an account.
2. Add Task: Click on the appropriate button to add a new task.
3. Drag and Drop: Move tasks between TODO, In Progress, and DONE columns using drag and drop.
4. Task Details: Click on a task to view its details and options for editing or deleting.

