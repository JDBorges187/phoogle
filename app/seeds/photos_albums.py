from app.models import db, User, Photo, Album

# Adds a demo user, you can add other users here if you want
def seed_albums():
    # print("**************started albums")
    user = User.query.filter(User.email == "demo@aa.io").first()

    photo1 = Photo(
        owner=user,
        photo_url="http://source.unsplash.com/1600x900/?nature"
    )
    photo2 = Photo(
        owner=user,
        photo_url="http://source.unsplash.com/1600x900/?sports"
    )
    photo3 = Photo(
        owner=user,
        photo_url="http://source.unsplash.com/1600x900/?cars"
    )
    photo4 = Photo(
        owner=user,
        photo_url="http://source.unsplash.com/1600x900/?random"
    )
    photo5 = Photo(
        owner=user,
        photo_url="http://source.unsplash.com/1600x900/?people"
    )
    photo6 = Photo(
        owner=user,
        photo_url="http://source.unsplash.com/1600x900/?lifestyle"
    )
    photo7 = Photo(
        owner=user,
        photo_url="http://source.unsplash.com/1600x900/?programming"
    )
    db.session.add(photo1)
    db.session.add(photo2)
    db.session.add(photo3)
    db.session.add(photo4)
    db.session.add(photo5)
    db.session.add(photo6)
    db.session.add(photo7)

    album1 = Album(
        name="Album 1",
        owner=user
    )
    album1.photos.append(photo1)
    album1.photos.append(photo2)
    album1.photos.append(photo6)
    album1.photos.append(photo7)
    album2 = Album(
        name="Album 2",
        owner=user
    )
    album2.photos.append(photo2)
    album2.photos.append(photo3)
    album2.photos.append(photo4)
    album2.photos.append(photo5)
    db.session.add(album1)
    db.session.add(album2)



    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_albums():
    db.session.execute('TRUNCATE albums RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE photos RESTART IDENTITY CASCADE;')
    db.session.commit()
