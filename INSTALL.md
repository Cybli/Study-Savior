# Study Savior — Developer Documentation/INSTALL.md

> **Group 10:** Sophie Peroutka, Beck Johnson, Samuel Vernick, Nat Rurka  
> **Repository:** https://github.com/Cybli/Study-Savior

## Accessing the Hosted Version ##
[```http://flip4.engr.oregonstate.edu:4000/```](http://flip4.engr.oregonstate.edu:4000/)

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
│   ├── __mocks__/                  # Contains Jest mock files for CI testing
│   ├── node_modules/               # Backend dependencies (gitignored)
│   ├── dbconnector.js              # Database connection pool (gitignored, must create manually)
│   ├── package.json                # Backend dependencies and scripts
│   ├── package-lock.json           # Locked dependency versions
│   |── README.md                   # Backend-specific notes
│   ├── server.js                   # Main Express server, all API routes defined here
│   └── server.test.js              # Contains Jest tests for the backend routes
│
├── database/                       # Database files
|   ├── AddLocation_Template.sql    # SQL template for manually adding study locations
│   ├── Schema.sql                  # MySQL schema — defines all tables and relationships
│   └── Study_Savior_ERD.mwb        # MySQL Workbench ERD diagram
│
├── frontend/                       # React frontend application
|   ├── assets/                     # Assets for the frontend UI
│   |   ├── marker-icon-2x-red.png  # Red marker icon for retina displays
│   │   └── marker-icon-red.png     # Red marker icon
│   ├── components/                 # Reusable React components
│   │   ├── LocationSidebar.jsx     # Sidebar with location details and tags
│   │   ├── LoginForm.jsx           # Login page with integrated registration section
│   │   ├── Review.jsx              # Review page
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
- **`backend/server.test.js`** - All backend tests for API routes live here. Add new tests here
- **`frontend/App.jsx`** - Main React component handling the map, side panel, and authentication UI.
- **`database/Schema.sql`** - Source of truth for the database structure. Update this when making schema changes.
- **`database/Study_Savior_ERD.mwb`** - Visual ERD, open with MySQL Workbench.
- **`runDev.sh`** - Installs all dependencies and starts both frontend and backend servers.
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

We use **[Jest](https://jestjs.io/)** as our test automation framework along with [Supertest](https://www.npmjs.com/package/supertest)  HTTP route testing on our backend.

- **Jest** - JavaScript testing framework that handles unit and integration tests
- **Supertest** Allows HTTP requests to be made to our Express app without spinning up a live server

Tests are located in `backend/server.test.js` and cover all API routes defined in `server.js`.

**Why Jest and Supertest?**

 **Familiarity** — Jest is the most widely used JavaScript testing framework and integrates naturally with Node.js projects
- **Zero config** — Works out of the box with no complex setup required
- **Built-in coverage** — Jest includes code coverage reporting without needing additional tools
- **Async support** — Handles async/await testing natively, which is essential for testing database queries and API routes
- **Supertest integration** — Supertest works seamlessly with Express and Jest, allowing testing without a live server

---

## Adding New Tests


1. Open `backend/server.test.js`
2. Add a new `describe` block for the route you want to test, following the existing pattern:

```javascript
describe('GET /your-new-route', () => {
    it('returns expected data (200)', async () => {
        // Set up what the mock DB should return
        pool.query.mockResolvedValueOnce([fakeData]);

        // Make the request
        const res = await request(app).get('/your-new-route');

        // Assert the result
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('someField');
    });

    it('returns 500 on DB error', async () => {
        pool.query.mockRejectedValueOnce(new Error('DB error'));
        const res = await request(app).get('/your-new-route');
        expect(res.statusCode).toBe(500);
    });
});
```

3. Run `npm run test` from the `backend/` directory to verify the new test passes
4. Commit and push — the CI pipeline will automatically run all tests including your new one

---

#### **CI Service: GitHub Actions**

We use **GitHub Actions** as our CI service. The repository is hosted on GitHub at https://github.com/Cybli/Study-Savior, and GitHub Actions is configured directly within the repository via `.github/workflows/ci.yml`. No external service account or linking is required — Actions is built into GitHub and triggers automatically on repository events.

The workflow installs Node.js 18, installs backend dependencies via `npm install`, and runs the test suite via `npm run test`. Because the real database connector is gitignored (it contains OSU MySQL credentials), a safe stub is provided via `backend/__mocks__/dbconnector.js`, and the `moduleNameMapper` field in `package.json` ensures Jest always resolves `./dbconnector` to the mock during CI.

**Why GitHub Actions?**

- **Built into GitHub** — No external account or service linking required. Since the project is already on GitHub, Actions is available immediately with no setup overhead
- **Free for public repositories** — No cost for our use case
- **Simple YAML configuration** — Workflow files are straightforward, version-controlled alongside the code, and well documented
- **Large marketplace** — Thousands of pre-built actions available for common tasks (e.g., `actions/checkout`, `actions/setup-node`)
- **Native secret management** — Supports encrypted repository secrets for any future environment variables needed in CI

**CI Pros/Cons Matrix**

| Feature | GitHub Actions | Travis CI | CircleCI |
|---------|---------------|-----------|----------|
| GitHub integration | Native — built-in, zero setup | Good — requires OAuth link | Good — requires OAuth link |
| Free tier | Free for public repos, 2,000 min/month for private | Limited — no longer free for open source as of 2023 | Limited — 6,000 credits/month free tier |
| Setup complexity | Low — YAML file in repo | Low — YAML file in repo | Medium — additional dashboard config |
| Configuration format | YAML | YAML | YAML |
| Marketplace/plugins | Very large (10,000+ actions) | Smaller ecosystem | Smaller ecosystem |
| Self-hosted runners | Yes | No | Yes |
| Documentation quality | Excellent | Good | Good |
| Best suited for | GitHub-hosted projects of any size | Legacy open source projects | Large enterprise teams |

**Decision:** GitHub Actions was the clear choice given the project is already on GitHub, the free tier covers all our needs, the YAML config lives directly in the repo alongside the code, and no external service linking is required.

#### **Which Tests Run in a CI Build**

Every CI build automatically runs the full backend test suite, which includes:

- All Jest unit-style tests that verify individual route handler logic in isolation (e.g., correct status codes, correct response body structure)
- All route integration tests via Supertest that simulate real HTTP requests to the Express app (e.g., `GET /locations`, `POST /login`, `POST /register`, `POST /ratings`, `GET /me`, `POST /logout`)
- Both happy-path tests (valid inputs, expected success responses) and error-path tests (DB failures, duplicate entries, invalid credentials, missing auth tokens)

#### **What Development Actions Trigger a CI Build**

A CI build is triggered automatically on two events, defined in `.github/workflows/ci.yml`:

- A **push** to any branch — ensures every commit pushed to the repository is tested immediately
- A **pull request** opened or updated targeting the `main` branch — ensures all code proposed for merging into `main` passes the full test suite before it can be merged

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
