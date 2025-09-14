# DJS01: Vanilla JS Podcast App

# Podcast Grid App

## Description
This project is a dynamic podcast web application that displays a grid of podcasts with filtering, sorting, and detailed modal views. Users can browse podcasts by genre, view seasonal details, and get information about each podcast without leaving the page. The app is fully modular, making it easy to maintain and extend.

---

## Technologies Used
- **HTML5** – Markup for the grid and modal structure  
- **CSS3** – Styling for cards, modal, and responsive layout  
- **JavaScript (ES Modules)** – Modular functionality for rendering, filtering, and modal management  
- **DOM APIs** – Dynamic creation and manipulation of HTML elements  
- **SVG Icons** – Lightweight icons for metadata such as seasons

---

## Features
- Dynamic podcast grid rendering from a `podcasts` dataset  
- Filtering by genre or tag  
- Sorting by title or last updated  
- Lazy-loaded images for better performance  
- Detailed podcast modal with:
  - Title and description
  - Cover image
  - Genres / tags
  - Last updated timestamp
  - Season details with number of episodes  
- Accessible modal with keyboard support (Escape key closes)  
- Modular, maintainable JavaScript structure (split into `createPodcast.js`, `createGrid.js`, `genreServices.js`, `dataUtils.js`, `modal.js`)  

---

## Setup Instructions
1. Clone or download the repository:

```bash
git clone <repository-url>
