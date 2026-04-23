# 💍 Wedding Invitation Website
### Maria & Juan — December 25, 2026

> A beautiful, animated digital wedding invitation built as a project for **CPE 408A-CPE22S2 Emerging Technologies 1**.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Pages](#pages)
- [Project Structure](#project-structure)
- [Getting Started (For Developers)](#getting-started-for-developers)
- [Technologies Used](#technologies-used)
- [Team](#team)

---

## About the Project

This is a fully responsive, single-page wedding invitation website for **Maria & Juan**, featuring animated UI elements, an interactive RSVP form, event details, a live countdown timer, and a 3D envelope opening animation. The site enforces a mandatory invitation flow before guests can access the main landing page.

**Live Demo:** [https://reycxz.github.io/wedding-inv-project/](https://reycxz.github.io/wedding-inv-project/)

---

## ✨ Features

- 🎬 **3D Envelope Opening Animation** — Guests are greeted with an animated envelope reveal on first visit
- 🔒 **Mandatory Invitation Flow** — Session storage ensures guests view the invitation before accessing the main page
- 🌸 **Floating Petal Animations** — Animated floating petals rendered on an HTML5 Canvas
- 🎵 **Background Music Toggle** — Play/Pause with animated SVG icons and a pulsing glow effect
- ⏳ **Live Countdown Timer** — Real-time countdown to the wedding date (December 25, 2026)
- 📅 **Interactive Calendar Widget** — Visual calendar highlighting the wedding date
- 🗺️ **Embedded Google Maps** — Maps for both the ceremony and reception venues
- 🖼️ **Image Slideshows** — Photo carousels for the Cathedral, Hotel, and Dress Code sections
- 👗 **Dress Code Gallery** — Tabbed attire guide for Men and Women with image slideshows
- 📩 **RSVP Modal Form** — Guests can RSVP with attendance, guest count, and special notes
- 💬 **Guest Message Wall** — Guests can leave heartfelt messages for the couple
- 📲 **Fully Responsive** — Optimized for mobile, tablet, and desktop devices
- 🍔 **Hamburger Navigation** — Mobile-friendly collapsible nav menu

---

## 📄 Pages

| Page | File | Description |
|---|---|---|
| Invitation | `invitation.html` | 3D envelope animation — the entry point for all guests |
| Home | `index.html` | Main landing page with all wedding details |
| About Us | `about.html` | Information about the development team |

---

## 📁 Project Structure

```
wedding-inv-project/
│
├── index.html              # Main wedding landing page
├── invitation.html         # Animated envelope invitation page
├── about.html              # About the development team
│
├── style.css               # All site-wide styles and animations
├── script.js               # JavaScript logic (countdown, RSVP, slideshows, etc.)
│
├── wedding-thousandyears.mp3   # Background music
│
└── source-images/          # All image assets
    ├── couple.png
    ├── cath1.jpg            # Manila Cathedral photos
    ├── cath2.png
    ├── cath3.jpg
    ├── mnl1.jpg             # Manila Hotel / Grand Ballroom photos
    ├── mnl2.png
    ├── mnl3.jpg
    ├── attire_men.png       # Men's formal attire
    ├── men2.png
    ├── men3.png
    ├── men4.png
    ├── men5.png
    ├── attire_women.png     # Women's formal attire
    ├── women2.png
    ├── women3.png
    ├── women4.png
    ├── ballroom1.png
    ├── ballroom2.png
    ├── church1.png
    ├── church2.png
    ├── Rey.png              # Team member photo
    ├── josh.jpg             # Team member photo
    └── renzo.jpg            # Team member photo
```

---

## 🚀 Getting Started (For Developers)

### Step 1. Download the Project

Download the project files from the repository or copy them into your local machine.

```
https://github.com/reycxz/wedding-inv-project
```

You can download it as a ZIP by clicking **Code → Download ZIP** on GitHub, or clone it using Git:

```bash
git clone https://github.com/reycxz/wedding-inv-project.git
```

---

### Step 2. Open the Project Folder

Locate the project folder and open it using any code editor such as **Visual Studio Code**.

```
File > Open Folder > wedding-inv-project/
```

---

### Step 3. Run the Project

Open the `invitation.html` file in any web browser (e.g., **Google Chrome**, **Microsoft Edge**).

> **Note:** Always open `invitation.html` first. The site uses `sessionStorage` to enforce a mandatory first visit to the invitation page before accessing the main content.

To open it directly:
- Right-click `invitation.html` → **Open With** → choose your browser, or
- Drag and drop the `invitation.html` file into your browser window.

---

### Step 4. Navigate the System

Use the navigation links to access all pages and sections:

| Navigation | Destination |
|---|---|
| `Maria & Juan` (brand logo) | Back to top / Hero section |
| `Save the Date` | Countdown timer & calendar |
| `Details` | Ceremony, Reception & Dress Code |
| `RSVP` | Opens the RSVP modal form |
| `Messages` | Guest message wall |
| `About Us` (nav link) | About the development team |

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **HTML5** | Page structure and semantic markup |
| **CSS3** | Styling, animations, transitions, and responsive layout |
| **Vanilla JavaScript** | Countdown timer, slideshows, RSVP form, canvas animations |
| **HTML5 Canvas API** | Floating petal particle animation |
| **sessionStorage API** | Enforce invitation flow on first visit |
| **Google Maps Embed API** | Interactive maps for ceremony and reception venues |
| **Google Fonts** | Typography |

> **No external libraries or frameworks required.** This project runs entirely on plain HTML, CSS, and JavaScript — no npm, no build tools.

---

## 👥 Team

This project was developed by students of **CPE 408A-CPE22S2** for the course **Emerging Technologies 1**.

| Name | Role |
|---|---|
| Rey | Lead Developer / Project Owner |
| Josh Daniel Solvera | Developer |
| Renzo | Developer |

---

## 📝 License

© 2026 Maria & Juan. All rights reserved.  
This project was created for academic purposes as part of CPE 408A-CPE22S2 Emerging Technologies 1.
