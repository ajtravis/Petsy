from app.models import db, Order, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_orders():
    o1 = Order(
        user_id=1,
        closed=False,
        amount=8.98
        )
    o2 = Order(
        user_id=4,
        closed=False,
        amount=15.98
        )
    o3 = Order(
        user_id=3,
        closed=False,
        amount=12.99
        )
    o4 = Order(
        user_id=2,
        closed=False,
        amount=59.90
        )
    db.session.add(o1)
    db.session.add(o2)
    db.session.add(o3)
    db.session.add(o4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM orders")

    db.session.commit()
