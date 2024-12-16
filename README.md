# Blog Application Frontend

A responsive blog frontend project built using **React**, **Vite**, and **Modular CSS**. The application features CRUD functionality for blogs, liking and commenting, showcasing projects, an about-me section, and a newsletter displaying current news.

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Scripts](#-scripts)
- [Folder Structure](#-folder-structure)
- [Screenshots](#️-screenshots)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

## 🚀 Features

- Blog Section
  - CRUD Functionality: Create, update, delete, and read blog posts.
  - Likes & Comments: Users can like and comment on blog posts.
  - Rich UI: Modular CSS ensures consistent styling across the app.
- Projects Section
  - Showcases a list of personal projects with details.
- About Me
  - Highlights my professional background and skills.
- Newsletter
  - Displays the latest news fetched dynamically using an API.

## 🛠️ Tech Stack

- Frontend: React.js (with React Router for routing)
- Styling: Modular CSS
- State Management: Redux Toolkit
- API Calls: Axios
- Carousel: Swiper.js
- Notifications: React Toastify
- Development: Vite for fast builds and hot module replacement

## ⚙️ Installation

- Prerequisites
- Ensure you have the following installed:
  - Node.js (v16+)
  - npm or yarn
- Steps
  - Clone the repository: git clone https://github.com/rayan25nov/Blog-Application.git
  - Navigate to the project directory: cd blog-frontend
  - Install dependencies: npm install
- Start the development server:
  - npm start
  - npm run dev

## 📄 Environment Variables

Create a .env file in the root directory to configure API keys or URLs:

- VITE_REACT_APP_API_URL=your_backend_api_url
- VITE_REACT_APP_NEWS_API=your-news-api-key

## 🔧 Scripts

The following scripts are available in the project:

- npm run dev: Start the development server.
- npm start: Start the development server.
- npm run build: Build the project for production.
- npm run preview: Preview the production build.
- npm run lint: Run ESLint to check for code quality issues.

## 📂 Folder Structure

The project follows a modular and scalable structure for maintainability and ease of development. Below is an overview of the key folders:

```
└── 📁blog-frontend
    └── 📁api
        └── news.js
    └── 📁public
        └── blog.png
    └── 📁src
        └── 📁assets
            └── 📁images
                └── arrow.png
                └── authenticate.jpg
                └── background.jpg
                └── bars.png
                └── Character.svg
                └── cross.png
                └── delete.png
                └── dislike.png
                └── email.png
                └── forgot-password.jpg
                └── github.png
                └── like.png
                └── linkedin.png
                └── moon.png
                └── profile_2.jpg
                └── profile_3.jpg
                └── profile.jpg
                └── reset-password.jpg
                └── sun.png
                └── verified.png
        └── 📁Auth
            └── 📁emailverify
                └── EmailVerify.jsx
                └── EmailVerify.module.css
            └── 📁forgot-password
                └── ForgotPassword.jsx
                └── ForgotPassword.module.css
            └── 📁image
                └── success.png
            └── 📁login
                └── Login.jsx
                └── Login.module.css
            └── 📁reset-password
                └── ResetPassword.jsx
                └── ResetPassword.module.css
            └── 📁signup
                └── Signup.jsx
                └── Signup.module.css
        └── 📁Features
            └── BlogSlice.js
            └── Store.js
            └── ToggleModeSlice.js
        └── 📁Home
        └── 📁loader
            └── Loader.jsx
            └── Loader.module.css
        └── 📁Navbar
            └── Navbar.jsx
            └── Navbar.module.css
        └── 📁Routes
            └── 📁About
                └── About.jsx
                └── About.module.css
            └── 📁Blog
                └── Blog.jsx
                └── Blog.module.css
                └── data.json
            └── 📁Card
                └── Card.jsx
                └── Card.module.css
            └── 📁Comments
                └── Comments.jsx
                └── Comments.module.css
            └── 📁CreateBlog
                └── CreateBlog.jsx
            └── 📁Likes
                └── LikeButton.jsx
                └── LikeButton.module.css
            └── 📁NewsLetter
                └── NewsCard.jsx
                └── NewsCard.module.css
                └── NewsLetter.jsx
                └── NewsLetter.module.css
            └── 📁Profile
                └── Profile.jsx
                └── Profile.module.css
            └── 📁Projects
                └── Project.jsx
                └── Project.module.css
                └── ProjectCard.module.css
                └── ProjectData.json
            └── 📁SpecificBlog
                └── 📁UpdateBlog
                    └── UpdateBlog.jsx
                    └── UpdateBlog.module.css
                └── SpecificBlog.jsx
                └── SpecificBlog.module.css
        └── 📁utils
            └── AuthCheck.js
        └── App.jsx
        └── App.module.css
        └── main.jsx
    └── .env
    └── .eslintrc.cjs
    └── .gitignore
    └── index.html
    └── package-lock.json
    └── package.json
    └── README.md
    └── vercel.json
    └── vite.config.js
```

## 🖼️ Screenshots

- Blog Section

- Projects

- About

- Newsletter

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📜 License

This project is licensed under the ISC License.

## ✨ Acknowledgements

Icons and images from Unsplash and Flaticon.
News data fetched from a third-party API.
