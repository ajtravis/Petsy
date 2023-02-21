from app.models import db, Cart_Item, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_cart_items():
    item1 = Cart_Item(
        product_id=1,
        quantity=1,
        order_id=1
        )
    item2 = Cart_Item(
        product_id=2,
        quantity=1,
        order_id=1
        )
    item3 = Cart_Item(
        product_id=3,
        quantity=2,
        order_id=2
        )
    item4 = Cart_Item(
        product_id=4,
        quantity=1,
        order_id=3
        )
    item5 = Cart_Item(
        product_id=2,
        quantity=10,
        order_id=4
        )
    db.session.add(item1)
    db.session.add(item2)
    db.session.add(item3)
    db.session.add(item4)
    db.session.add(item5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_cart_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM cart_itmes")

    db.session.commit()
