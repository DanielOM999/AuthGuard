# Authguard
Authguard is a project exploring a login system using Supabase, JavaScript, CSS, Handlebars, and Node.js. The goal is to build a secure and interactive authentication flow, leveraging Supabase's powerful backend-as-a-service functionality.

# Prerequisites
Before you begin, ensure you have the following environment variables set in a `.env` file in your project directory:
- `SUPABASE_PROJECT_URL`: The URL of your Supabase project.
- `SUPABASE_ANON_KEY`: Your Supabase anonymous key.

# Setup Instructions
Create a `.env` file in your project root directory and add the following variables:

```.env
SERVER_LOGIN=your_password_here
SUPABASE_PROJECT_URL=your_project_url_here
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

# Install Dependencies
Run the following command to install all necessary dependencies:
```plaintext
npm install
```

# Running the Application
After setting up the .env file and installing dependencies, you can start the application with:
```plaintext
npm run start
```
or, for development with live reload:
```plaintext
npm run dev
```

# Usage
Once the application is running, navigate to [http://localhost:3000](http://localhost:3000) in your web browser to access the project.

## Features
- User authentication using Supabase's secure APIs.
- Login and signup interfaces styled with CSS.
- Handlebars templating for dynamic UI rendering.
- Backend powered by Node.js for handling routes and API calls.

# License
This project is licensed under the MIT License. Feel free to customize and expand upon the project as needed!
