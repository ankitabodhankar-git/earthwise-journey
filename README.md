# EarthWise 🌿

**"Small Habits. Smarter Future."**

EarthWise is a modern sustainability platform built to help users understand their environmental impact and adopt a greener lifestyle through smart decision-making and habit tracking.

## 📥 How to Download as ZIP

If you want to save a copy of this project to your computer:

1. **Create the ZIP in the Terminal:**
   Copy and paste this command into the terminal below:
   ```bash
   zip -r earthwise-project.zip . -x "node_modules/*" ".next/*" ".git/*"
   ```
2. **Download the file:**
   - Look at the **File Tree** on the left side of your screen.
   - Find the file named `earthwise-project.zip`.
   - **Right-click** it and select **Download**.

---

## 📋 How to Paste into the Terminal

If standard `Ctrl + V` is not working, try these:

- **Windows/Linux:** `Ctrl + Shift + V`
- **Mac:** `Cmd + V`
- **Universal:** **Right-click** anywhere inside the black terminal area and select **Paste**.
- **Alternative:** `Shift + Insert`

---

## 🚀 How to Push to GitHub

If you see an error saying `origin` does not exist, follow these steps exactly. **Copy each line one by one and paste them into the terminal.**

```bash
# 1. Initialize git (if you haven't already)
git init

# 2. Add all project files
git add .

# 3. Commit your changes
git commit -m "Initial commit: EarthWise sustainability platform"

# 4. Link to your specific GitHub repo
# IMPORTANT: If you get an error that 'origin' already exists, run: git remote remove origin
git remote add origin https://github.com/ankitabodhankar-git/earthwise-journey

# 5. Rename branch to main
git branch -M main

# 6. Push to GitHub
git push -u origin main
```

## ✨ Key Features

- **Smart Choices:** Interactive decision-making cards to visualize daily impact.
- **Earth Impact Score:** Scoring system (Beginner, Conscious Citizen, EarthWise Hero).
- **Impact Dashboard:** Summary of active habits and CO₂/Water savings.
- **Habit Tracker:** Personalized list of sustainable daily wins.
- **Privacy First:** All data is stored locally in your browser using `localStorage`.

## 🛠️ Tech Stack

- **Framework:** Next.js 15
- **Library:** React 19
- **Styling:** Tailwind CSS
- **Components:** ShadCN UI
- **AI:** Genkit (Personalized recommendations)

---
Built for the Global Sustainability Challenge.
