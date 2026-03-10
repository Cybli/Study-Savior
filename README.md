# Study Savior

> Discover the best study spots on the Oregon State University campus.

Study Savior is a campus-focused web app that helps OSU students find, rate, and review study locations across campus. Browse an interactive map, read reviews from fellow students, and share your favorite hidden study spots.

Link to active website: http://flip4.engr.oregonstate.edu:4000/

---

## Preview
<img width="1917" height="916" alt="StudySavior - Preview" src="https://github.com/user-attachments/assets/ac3bd403-5f63-403f-8f3f-ee4d701434d0" />


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

## Supported Operating Systems

| OS | Supported |
|-------|------------|
| Windows | Yes |
| Mac OS | Yes |
| Linux | Yes |
| iOS | No |
| Android | No |

---

## Quick Start

```bash
git clone https://github.com/Cybli/Study-Savior.git
cd Study-Savior
cp backend/dbconnector.example.js backend/dbconnector.js
# Fill in your database credentials in backend/dbconnector.js
./runDev.sh
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
