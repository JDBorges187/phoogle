# Phoogle
Phoogle is a [Google Photos](https://photos.google.com/) clone. With potential future for personal cloud storage on your own server or Network Attached Storage device.

### [LIVE SITE](https://phoogle.herokuapp.com/)


### Back End
Phoogle was built using Flask for the server with a postgreSQL database. The back end structure utilizes RESTful convention and handles user requests through our 
[API](https://github.com/facebook/react/wiki/api-documentation) and uses JSON and redux to update the front end. Phoogle uses the Flask-Workzeug module for to safely store user passwords and verify login credentials. 
### Front End
The front end was built using React Components to render the pages with JavaScript and Redux to store state and make the pages dynamic. All styles are Vanilla CSS
### List of Technologies
* Flask
* Workzeuf
* SQLAlchemy
* PostgreSQL
* Heroku
* React
* Redux

### Core Features
* Add/ delete photos.
* Create, Delete and Rename Albums.
* Add / Remvoe Photos from Album
* Sign up/Login/ Demo User

### Future Addiostions
* Implement Favorites for Photos
* Allow sharing of Albums and photos
* Dockerfile implementation of [minio](https://github.com/minio/minio)
* Facial recognition utilizing  [Amazon Rekognition](https://aws.amazon.com/rekognition/)


