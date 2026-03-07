# Study Savior — Developer Documentation

> **Group 10:** Sophie Peroutka, Beck Johnson, Samuel Vernick, Nat Rurka  
> **Repository:** https://github.com/Cybli/Study-Savior

---

## Table of Contents

1. [Obtaining the Source Code](#obtaining-the-source-code)
2. [Directory Structure](#directory-structure)
3. [Building the Software](#building-the-software)
4. [Testing the Software](#testing-the-software)
5. [Adding New Tests](#adding-new-tests)
6. [Building a Release](#building-a-release)

---

## Obtaining the Source Code

Clone the repository using Git:

```bash
git clone https://github.com/Cybli/Study-Savior.git
cd Study-Savior
```

### Important: Create dbconnector.js

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

---

## Directory Structure

```
Study-Savior/
├── .github/                        # GitHub Actions CI/CD workflows
|
├── backend/                        # Node.js/Express backend server
│   ├── node_modules/               # Backend dependencies (gitignored)
│   ├── dbconnector.js              # Database connection pool (gitignored, must create manually)
│   ├── server.js                   # Main Express server, all API routes defined here
│   ├── package.json                # Backend dependencies and scripts
│   ├── package-lock.json           # Locked dependency versions
│   └── README.md                   # Backend-specific notes
│
├── database/                       # Database files
|   ├── AddLocation_Template.sql    # SQL template for manually adding study locations
│   ├── Schema.sql                  # MySQL schema — defines all tables and relationships
│   └── Study_Savior_ERD.mwb        # MySQL Workbench ERD diagram
│
├── frontend/                       # React frontend application
│   ├── components/                 # Reusable React components
│   │   ├── LocationSidebar.jsx     # Sidebar with location details and tags
│   │   └── SearchBar.jsx           # Search bar component
│   ├── dist/                       # Production build output (gitignored)
│   ├── node_modules/               # Frontend dependencies (gitignored)
│   ├── public/                     # Static assets served directly
│   ├── App.css                     # Global styles
│   ├── App.jsx                     # Main React component, map and UI logic
│   ├── config.js                   # Config for the URL of the backend
│   ├── index.html                  # HTML entry point
│   ├── main.jsx                    # React entry point
│   ├── postcss.config.js           # PostCSS configuration for Tailwind
│   ├── vite.config.js              # Vite bundler configuration
│   ├── package.json                # Frontend dependencies and scripts
│   ├── package-lock.json           # Locked dependency versions
│   └── README.md                   # Frontend-specific notes
│
├── reports/                        # Project reports and deliverables
├── .gitignore                      # Gitignored files
├── Developer_Documentation.md      # Documentation for developers
├── Living_Document.md              # Living document for project tracking
├── README.md                       # Project overview
├── runDeployment.sh                # Builds frontend and starts backend with forever
├── runDev.sh                       # Local development launch script
├── stopDeployment.sh               # Stops the forever backend process
└── User_Manual.md                  # Documentation for users
```

### Key Files

- **`backend/server.js`** - All API routes live here (`/locations`, `/register`, `/login`). Add new routes here.
- **`frontend/App.jsx`** - Main React component handling the map, side panel, and authentication UI.
- **`database/Schema.sql`** - Source of truth for the database structure. Update this when making schema changes.
- **`database/Study_Savior_ERD.mwb`** - Visual ERD, open with MySQL Workbench.
- **`run.sh`** - Installs all dependencies and starts both frontend and backend servers.
- **`StudySavior_LivingDocument.md`** - Running project notes and team decisions.

---

## Building the Software

### Prerequisites

| Tool | Version | Download |
|------|---------|----------|
| Node.js | v18 or higher | https://nodejs.org |
| npm | v9 or higher | https://nodejs.org |
| Git | Any recent version | https://git-scm.com |
| MySQL | v8.0 or higher | https://dev.mysql.com/downloads/ |

### Using runDev.sh (Recommended)

The easiest way to install dependencies and start the app is with the provided script:

```bash
chmod +x runDev.sh
./runDev.sh
```

This will install all frontend and backend dependencies and start both servers.

### Manual Setup

If you need to install or run each part separately:

**Backend:**
```bash
cd backend
npm install express
npm install cors
npm install mysql2
npm install bcrypt
npm install
node server.js
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### Setting Up the Database

Import the schema into your MySQL database using PHPMyAdmin or the CLI:

```bash
mysql -u YOUR_USER -p YOUR_DATABASE_NAME < database/Schema.sql
```

Once imported, the following tables will exist:

| Table | Description |
|-------|-------------|
| `user` | User accounts with unique usernames, bcrypt hashed passwords, and salt. |
| `location` | Study spot info including name, description, building, GPS coordinates (POINT), image path, and precomputed average ratings. |
| `rating` | Individual user reviews with noise, comfort, and crowded ratings (1–5). Each user can only rate a location once. Cascades on user or location delete. |
| `tag` | Available tags (e.g. "Collaborative", "Natural Light"). Each tag name must be unique. |
| `location_tags` | Junction table linking locations to their tags (many-to-many). Cascades on location or tag delete. |

> **Note:** Before running the schema, set your database name at the top of `Schema.sql`:
> ```sql
> SET @DATABASE_NAME = 'your_database_name';
> ```

---

## Testing the Software

There is currently no automated test suite. Testing is done manually. A formal testing framework is planned for a future milestone.

---

## Adding New Tests

Automated testing is planned but not yet implemented. When tests are added, the project will use **Jest** for backend unit testing.

---

## Building a Release

### Deploying to the OSU Flip Server

1. **SSH into your assigned flip server:**
```bash
ssh YOUR_ONID@flipX.engr.oregonstate.edu
```

2. **Clone or pull the latest code:**
```bash
git pull origin main
```

3. **Create `dbconnector.js`** on the server if it doesn't exist yet (see [Obtaining the Source Code](#obtaining-the-source-code))

4. **Update config.js** to contain the URL of your backend
```bash
const API_URL = 'http://flip<ENTER FLIP NUMBER>.engr.oregonstate.edu:4000';
// Local dev
// const API_URL = 'http://localhost:4000';
export default API_URL;
```

6. **Install dependencies and deploy app:**
```bash
chmod +x runDeployment.sh
./runDeployment.sh
```

6. **If you would like to stop the deployment:**
```bash
chmod +x stopDeployment.sh
./stopDeployment.sh
```

### Manual Release Checklist

Before deploying a new release, verify the following:

- [ ] All changes are committed and pushed to `main`
- [ ] `database/Schema.sql` is up to date with any schema changes
- [ ] Backend port in `server.js` matches the team's assigned flip port
- [ ] Frontend fetch URLs in config.js point to the correct flip server and port (not `localhost`)
- [ ] No credentials or `.env` secrets are committed to the repository
- [ ] Test all API routes with curl after deploying (see [Testing the Software](#testing-the-software))

### Restarting After a Code Update

```bash
cd backend
npx forever restart server.js
```

---

> Study Savior — Group 10 | CS362 | Oregon State University

> This documentation was written with the assistance of Claude (Anthropic).
