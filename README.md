# Documentation for Image Labeling Web Application

## Overview

This web application allows users to upload, label, and manage images. It features user authentication, image upload with drag-and-drop functionality, and label management. The application is built using Django as the backend and React as the frontend.

## Features

- **User Authentication**: Register, login, and logout functionalities.
- **Image Upload**: Users can upload images either by traditional file selection or by drag-and-drop interface.
- **Label Management**: Users can assign labels to images from a predefined set or add custom labels. Images without labels are marked as "pending" and can be labeled later.
- **Search Functionality**: Users can search for images based on labels with fuzzy matching.
- **Image Management**: Users can delete images or update labels.

## Dependencies

### Backend (Django)

- Django
- Django Rest Framework
- Pillow (for image handling)
- Django CORS Headers (to handle cross-origin requests from the frontend)

### Frontend (React)

- React and ReactDOM
- Axios (for making API requests)
- React Router (for routing)
- React Dropzone (for drag-and-drop functionality)

## Installation

### Backend Setup

1. **Set up a virtual environment (optional but recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

2. **Install required packages:**
   ```bash
   pip install django djangorestframework pillow django-cors-headers
   ```

3. **Set up and run the Django project:**
   ```bash
   cd backend
   python manage.py makemigrations
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend Setup

1. **Install Node.js and npm if not already installed.**

2. **Install project dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Run the React development server:**
   ```bash
   npm start
   ```

## Usage

- **Register a new user or log in** using the authentication forms.
- **Upload images** by navigating to the 'Upload' page where you can either drag and drop files into the drop zone or use the file input to select images.
- **Label images** by choosing from the predefined labels or adding a custom label.
- **Search for images** using the search bar on the 'View Images' page.
- **Delete or update labels** on images by using the buttons provided under each image.

## API Endpoints

### User Management

- POST `/api/register/`: Register a new user.
- POST `/api/login/`: Log in a user.
- POST `/api/logout/`: Log out a user.

### Image Management

- GET `/api/user-images/`: Retrieve all images for the logged-in user.
- POST `/api/upload/`: Upload new images.
- DELETE `/api/delete-image/<int:image_id>/`: Delete a specific image.
- PATCH `/api/update-image-label/<int:image_id>/`: Update the label of a specific image.
