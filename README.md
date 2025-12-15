# TaskFlow – Task Management Web App 🗂️

TaskFlow is a **modern, responsive Kanban-style task management web application** built with **HTML, SCSS, and Vanilla JavaScript**.
The latest version focuses on a **clean UI redesign**, **flex-based layout**, and **smooth desktop + mobile interactions** without using any external libraries.

---

## 🚀 Live Demo

👉 [https://task-flow-mu-swart.vercel.app/](https://task-flow-mu-swart.vercel.app/)

---

## 📌 Project Overview

TaskFlow simulates a real-world productivity workflow used in popular task management tools.
The project emphasizes:

* Clean & modern UI
* SCSS-based design system
* Flexbox layout (no CSS grid)
* Desktop drag & drop + mobile touch support
* Simple, readable, beginner-friendly code

---

## ✨ Features

### 🧩 Task Management

* Create tasks with:

  * Task Title
  * Task Description
* Delete tasks instantly
* Three workflow stages:

  * **To Do**
  * **In Progress**
  * **Done**

---

### 🖱️ Drag & Drop + Touch Support

* **Desktop:**

  * Native HTML5 drag-and-drop
  * Smooth hover and lift animations
* **Mobile:**

  * Touch-based drag handling
  * Tasks can be moved between columns using touch gestures

---

### 💾 Local Storage Persistence

* Tasks are saved using **browser localStorage**
* Data remains intact after:

  * Page reload
  * Browser close & reopen

---

### 📱 Responsive Flexbox Layout

* **Mobile (Small Screens)**

  * Columns stack vertically
  * Optimized spacing and tap targets
* **Tablet (Medium Screens)**

  * Columns wrap into multiple rows
* **Desktop (Large Screens)**

  * Full Kanban board displayed in a single row

> ⚠️ Layout is built using **Flexbox only** (no CSS Grid).

---

### 🎨 UI & Styling (Updated)

* Modern dark-themed interface
* Glassmorphism-inspired panels
* Centralized SCSS variables for:

  * Colors
  * Spacing
  * Border radius
* Smooth hover, lift, and modal animations
* Clean parent–child SCSS structure

---

### 🪟 Modal System

* Modal popup to create new tasks
* Background blur overlay for focus
* Modal can be closed by:

  * Clicking outside the modal
  * Clicking the toggle button

---

## 🛠️ Tech Stack

| Technology       | Purpose                                |
| ---------------- | -------------------------------------- |
| HTML5            | Semantic structure                     |
| SCSS / CSS3      | Styling & responsiveness               |
| JavaScript (ES6) | App logic, drag & drop, touch handling |
| localStorage     | Persistent task storage                |

---

## ▶️ How to Run Locally

```bash
git clone https://github.com/realtauseefahmad/TaskFlow.git
cd TaskFlow
```

Open `index.html` in your browser.

---

## ▶️ How to Use

1. Open the live demo or run locally
2. Click **"+ New Task"**
3. Enter task title and description
4. Click **Add Task**
5. Drag tasks between columns (desktop or mobile)
6. Delete tasks when completed

---

## 🎯 Project Highlights (v2)

* UI completely redesigned
* Mobile touch drag support (manual implementation)
* Clean SCSS architecture with nested structure
* No frameworks, no libraries
* Real-world Git workflow used (feature branches + PRs)

---

## 👨‍💻 Author

**Tauseef Ahmad**
Frontend Developer

---

⭐ If you like this project, consider starring the repository!
