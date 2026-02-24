# Study Savior — User Manual

> **Group 10:** Sophie Peroutka, Beck Johnson, Samuel Vernick, Nat Rurka  
> **Repository:** https://github.com/Cybli/Study-Savior

---

## Table of Contents
1. [What is Study Savior?](#what-is-study-savior)
2. [Prerequisites](#prerequisites)
3. [Installation & Setup](#installation--setup)
4. [Running the Web App](#running-the-web-app)
5. [How to Use Study Savior](#how-to-use-study-savior)
6. [Reporting a Bug](#reporting-a-bug)
7. [Known Bugs & Limitations](#known-bugs--limitations)

---

## What is Study Savior?
Study Savior is a campus-focused application designed to help students discover new study locations throughout campus. This platform provides information about study locations using user-submitted reviews and ratings. Locations are rated based on comfort, noise level, crowdedness, and user-selected tags. These ratings are all combined to create an at-a-glance consensus on a study location, with further information being available if needed. This project hopes to encourage students to meet new people and explore campus, all while maintaining productivity.

**Why Study Savior?**
- Find new study locations on campus fast
- See rating for noise level, comfort, crowdedness, and view tags to see if a spot is right for you
- Submit reviews to inform other students about study spots

---

## Prerequisites

| Tool | Version | Download |
|------|---------|----------|
| Node.js | v18 or higher | https://nodejs.org |
| npm | v9 or higher (comes with Node.js) | https://nodejs.org |
| Git | Any recent version | https://git-scm.com |
| MySQL | v8.0 or higher | https://dev.mysql.com/downloads/ |

> **OSU Students and Staff:** You can use the OSU-provided MySQL server via PHPMyAdmin instead of installing MySQL locally. Contact your instructor for access credentials. https://it.engineering.oregonstate.edu/mysql-access-student-groups

To verify your installations, run:
```bash
node --version
npm --version
git --version
```

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Cybli/Study-Savior.git
cd Study-Savior
```

### 2. Create Your Database Connector

The database configuration file is intentionally **not included** in the repository as it contains private information pertaining to your database. You must create it manually.

Create a file at `backend/dbconnector.js` and add the following, filling in your own database credentials:

```js
// Get an instance of mysql
const mysql = require('mysql2');

// Create a connection to the database
const pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit   : 10,
    host: 'YOUR_DATABASE_HOST',
    user: 'YOUR_DATABASE_USER',
    password: 'YOUR_DATABASE_PASSWORD',
    database: 'YOUR_DATABASE_NAME',
}).promise();

// Export it for use in our application
module.exports = pool;
```

> ⚠️ **Never commit this file to GitHub.** It is already listed in `.gitignore` to prevent accidental exposure of your credentials.

### 3. Set Up the Database

Import the database schema into your MySQL server using PHPMyAdmin or the MySQL CLI:

```bash
mysql -u YOUR_USER -p YOUR_DATABASE_NAME < database/schema.sql
```

### 4. Run the Setup Script

A setup script is provided to install all dependencies and start the application:

```bash
chmod +x run.sh
./run.sh
```

This will install all frontend and backend dependencies and start both the frontend and backend servers automatically.

---

## Running the App

If you've already completed setup and just want to start the app:

```bash
./run.sh
```

Or manually:

```bash
# Start the backend
cd backend
npx forever start server.js

# Start the frontend (in a separate terminal)
cd frontend
npm run dev
```

The app will be available at:
- **Frontend:** `http://localhost:5173`
- **Backend API:** `http://localhost:4000`

> **OSU Flip Server:** If running on the OSU flip servers, replace `localhost` with your assigned flip server URL (e.g., `http://flipX.engr.oregonstate.edu:4000`). Use HTTPS where possible for security.

---

## How to Use Study Savior

### Viewing the Map

When you open Study Savior you'll see an interactive map of OSU's campus (can be changed to other campus' check frontend README for details). Study locations are marked with pins. The map can be panned and zoomed freely using your mouse or trackpad.

### Finding a Study Spot **- WIP**

Click the **"Find a Spot!"** search bar at the top center of the screen and type the name of a building or location. Matching results will appear in a dropdown click one to fly the map to that location and open its details.

### Viewing Location Details **- WIP**

Click any pin on the map to open the **side panel** on the left. This panel shows:
- A photo of the location
- The location name and building
- Star ratings for overall score, availability, quietness, comfort, and vibe
- Tags describing the spot (e.g., "Collaborative", "Natural Light")
- A written description of the location

### Creating an Account **- WIP**

Click **"Sign In or Create Account"** in the top right corner, then select **"Don't have an account? Register"**. Enter a username and password to create your account. **Passwords are securely hashed and salted they are never stored in plaintext.**

### Logging In **- WIP**

Click **"Sign In or Create Account"** in the top right corner, enter your username and password, and click **Sign In**. Once logged in your username will appear in the top right.

### Leaving a Review **- WIP**

Click a location pin to open the side panel, then click **"Leave a review!"** at the bottom.

## Reporting a Bug

Found something broken? Please report it using our **GitHub Issues tracker:**

👉 https://github.com/Cybli/Study-Savior/issues

### How to Write a Good Bug Report

A helpful bug report includes:

1. **Title** — A short, clear summary of the problem (e.g., "Map pins don't appear after logging in")
2. **Steps to Reproduce** — Exactly what you did before the bug appeared, step by step
3. **Expected Behavior** — What you expected to happen
4. **Actual Behavior** — What actually happened
5. **Screenshots** — If applicable, attach a screenshot or screen recording
6. **Environment** — Your browser, operating system, and screen size
7. **Console Errors** — If you're comfortable, open your browser's developer tools (F12), go to the Console tab, and paste any red error messages

> For more guidance on writing effective bug reports, see:
https://codingnest.com/how-to-file-a-good-bug-report/

---

## Known Bugs & Limitations

Current known issues are tracked in our GitHub Issues page:

👉 https://github.com/Cybli/Study-Savior/issues

**Current limitations as of this release:**

- Sidebar is not yet implemented
- Reviews are not yet implemented
- Location images are not yet implemented
- Account creation and login is not yet implemented

---

> Study Savior — Group 10 | CS362 | Oregon State University

> This user manual was written with the assistance of Claude (Anthropic).