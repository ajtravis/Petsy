from app.models import db, Category, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_categories():
    c1 = Category(
        category="dog"
    )
    c2 = Category(
        category="cat"
    )
    c3 = Category(
        category="fish"
    )
    c4 = Category(
        category="bird"
    )
    c5= Category(
        category="plant"
    )
    c6 = Category(
        category="rodent"
    )
    c7 = Category(
        category="food"
    )
    c8 = Category(
        category="toy"
    )
    c9 = Category(
        category="treat"
    )
    c10 = Category(
        category="crate/carrier"
    )
    c11 = Category(
        category="furniture"
    )
    c12 = Category(
        category="lizard"
    )
    c13 = Category(
        category="tank"
    )
    c14 = Category(
        category = "misc"
    )
    c15 = Category(
        category = "health/wellness"
    )

    cat_list = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15]

    for c in cat_list:
        db.session.add(c)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM categories")

    db.session.commit()
