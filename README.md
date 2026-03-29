# Web-Book-Reading

A modern, full-stack web application that allows users to build a personal library, upload PDF books, and track their reading progress seamlessly. 

## Features

* **Custom User Authentication:** Secure registration and login flow using jBCrypt for password hashing.
* **Guest Mode:** Allows non-registered users to browse the public library without an account.
* **PDF Upload & Parsing:** Users can upload `.pdf` files. The backend automatically processes the file, counts the pages, and generates a dynamic cover image.
* **Native Reading Experience:** Embedded, distraction-free PDF viewer using the browser's native engine.
* **Reading Dashboard:** A "My Books" interface that tracks user-specific reading history and visualizes progress with dynamic progress bars.
* **Manual Bookmarking:** Users can save their exact page number to resume reading later.
* **Modern UI:** Clean, responsive grid layout featuring hover overlays, floating action buttons (FAB), and dynamically generated user avatars.

## Tech Stack

**Frontend:**
* React (Vite)
* React Router (for SPA navigation)
* Vanilla CSS

**Backend:**
* Java / Spring Boot
* Spring Data JPA (Hibernate)
* jBCrypt (Security)

**Database & Storage:**
* PostgreSQL
* Local File System Storage (for physical `.pdf` and `.png` assets)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
* [Node.js](https://nodejs.org/) & npm
* [Java 17+](https://adoptium.net/)
* [PostgreSQL](https://www.postgresql.org/)
