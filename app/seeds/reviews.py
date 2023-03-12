from app.models import db, Review, Product, environment, SCHEMA
import random


ratings = [1, 2, 3, 4, 5]

# Adds a demo user, you can add other users here if you want
def seed_reviews():
    r1 = Review(
        user_id='1',
        product_id = 1,
        review="This is a great product, I loved it!",
        rating=random.choice(ratings),
    )
    r2 = Review(
        user_id='1',
        product_id = 2,
        review="Horrible",
        rating=random.choice(ratings),
    )
    r3 = Review(
        user_id='2',
        product_id = 1,
        review="My dog will love this!",
        rating=random.choice(ratings),
    )
    r4 = Review(
        user_id='2',
        product_id = 2,
        review="What a price! What savings!",
        rating=random.choice(ratings),
    )
    r5 = Review(
        user_id='3',
        product_id = 3,
        review="This is actually for me!",
        rating=random.choice(ratings),
    )
    r6 = Review(
        user_id='3',
        product_id = 4,
        review="My cat peed on it, and it smells now.",
        rating=random.choice(ratings),
    )
    r7 = Review(
        user_id='4',
        product_id = 5,
        review="When I got this for my kid he didnt like it.",
        rating=random.choice(ratings),
    )
    r8 = Review(
        user_id='3',
        product_id = 6,
        review="I wonder if scooby doo ever had one of these.",
        rating=random.choice(ratings),
    )
    reviews = [r1, r2, r3, r4, r5, r6, r7, r8]
    for r in reviews:
        db.session.add(r)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
