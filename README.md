# Study Savior

> Discover the best study spots on the Oregon State University campus.

Study Savior is a campus-focused web app that helps OSU students find, rate, and review study locations across campus. Browse an interactive map, read reviews from fellow students, and share your favorite hidden study spots.

---

## Preview
<img width="1438" height="778" alt="Screenshot_2026-02-27_at_7 00 52_PM" src="https://github.com/user-attachments/assets/cb7bda8e-fd38-4b01-b08a-7133e285b866" />


> *Interactive campus map with location details panel — OSU Corvallis*

---

## Features

- **Interactive campus map** powered by Leaflet and OpenStreetMap
- **Ratings & reviews** for noise level, comfort, crowdedness, and tags
- **Search** for study spots by name or building
- **User accounts** with secure password hashing (bcrypt + salt)
- **Tags** to quickly identify a spot's vibe (Quiet, Collaborative, Natural Light, etc.)

---

## Documentation

| Document | Description |
|----------|-------------|
| [User Manual](User_Manual.md) | How to install, run, and use Study Savior |
| [Developer Documentation](Developer_Documentation.md) | How to contribute, build, and test |
| [Living Document](Living_Document.md) | Project notes, decisions, and team tracking |

---

## Quick Start

```bash
git clone https://github.com/Cybli/Study-Savior.git
cd Study-Savior
cp backend/dbconnector.example.js backend/dbconnector.js
# Fill in your database credentials in backend/dbconnector.js
./run.sh
```

See the [User Manual](User_Manual.md) for full setup instructions.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Leaflet, Tailwind CSS |
| Backend | Node.js, Express |
| Database | MySQL |
| Map Data | OpenStreetMap |

---

## Found a Bug?

Open an issue on our [GitHub Issues tracker](https://github.com/Cybli/Study-Savior/issues). See the [User Manual](User_Manual.md#reporting-a-bug) for what information to include.

---

## Team

| Name | Role |
|------|------|
| Nat Rurka | Group Manager |
| Sophie Peroutka | Database Designer |
| Beck Johnson | Frontend Developer |
| Samuel Vernick | Full Stack Manager |

---

> CS362 — Oregon State University
