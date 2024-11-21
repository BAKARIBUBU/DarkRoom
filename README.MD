## DARKROOM - Movies/Series Club App

# OVERVIEW
Darkroom is a Movies/Series Club app designed to enhance the user experience through seamless organization, virtual screenings, discussions, personalized recommendations, and inclusive engagement tools. This README provides a comprehensive overview of the code structure, functionality, and guidance on getting started with the project.

# TABLE OF CONTENT
1.Features
2.Getting Started
3.Code Structure
4.Key Components
5.Usage
6.Contributing
7.License
8.Contact


# FEATURES
Users can:
1.Create an account
2.Login to the account
3.View and update their profile
4.Add & Share movies they’ve watched as posts
5.Join existing movie clubs based on Genre
6.Create and manage movie clubs
7.View more information about a post from a specific individual/movies community/club
8.Rate/Comment/Review a post made by a specific community member or individual
9.Follow and unfollow members either within movie clubs or outside movie clubs
10.Track all movies they’ve watched and share their experience about the movie

# GETTING STARTED
To get started with Darkroom, follow these steps:

1.Clone the repository:
git clone https://github.com/yourusername/darkroom.git
cd darkroom

2.Set up the backend:
Navigate to the backend directory.
Create a virtual environment and install dependencies:
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt

3.Set up the database:
Ensure PostgreSQL is installed and running.
Create a new database for the application.
Update the database connection settings in the configuration file.
4.Run migrations:
flask db upgrade

5.Start the backend server:
flask run

6.Set up the frontend:
Navigate to the frontend directory.
Install dependencies:
cd frontend
npm install

7.Start the frontend server:
npm start

Access the application: Open your browser and go to http://localhost:3000.

## Code Structure
The project is structured into two main directories: `backend` and `frontend`.

# Backend
app.py: The main application file that initializes the Flask app and sets up routes.
models.py: Contains the database models representing users, posts, movie clubs, and ratings.
routes.py: Defines the endpoints for user authentication, post management, and club functionalities.
config.py: Configuration settings for the Flask app, including database connection strings and secret keys.
migrations/: Contains database migration scripts created by Flask-Migrate.
requirements.txt: Lists the dependencies required for the backend.

# Frontend
src/index.js: The entry point for the React application.
src/App.js: The main application component that sets up routing and renders other components.
src/components/: Contains reusable React components (e.g., Header, Footer, MovieList, MoviePost).
src/pages/: Contains components for different pages (e.g., Home, Profile, MovieClub).
src/redux/: Contains Redux store configuration and slices for state management.
src/styles/: Contains CSS files for styling the application.
package.json: Lists the dependencies required for the frontend.


# Key Components
# Backend Key Components
Flask: A lightweight WSGI web application framework for building the backend.
PostgreSQL: A powerful open-source relational database system used to store user data, posts, and clubs.
Flask-Migrate: A tool that handles SQLAlchemy database migrations for Flask applications.

# Frontend Key Components
React: A JavaScript library for building user interfaces, used to create the frontend of the application.
Redux Toolkit: A library for managing application state, providing a powerful and efficient way to handle global state.
React Router: A library for routing in React applications, enabling navigation between different pages.

## Usage
Once the application is running, users can:

Sign Up: Create an account by providing necessary details.
Login: Access their account using their credentials.
Manage Profile: Update their profile information.
Create Posts: Share their movie-watching experiences.
Join Clubs: Explore

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## contribituing
1.Bakari Bubu
2.Favoured
3.Sharon 
4.Barkley