# Study Savior — SETUP GUIDE

> **Group 10:** Sophie Peroutka, Beck Johnson, Samuel Vernick, Nat Rurka  
> **Repository:** https://github.com/Cybli/Study-Savior

---

Please refer to the [Developer Documentation](Developer_Documentation.md)

The rest of SETUP.md will be taken from Developer Documentation

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
