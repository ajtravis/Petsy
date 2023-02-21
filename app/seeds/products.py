from app.models import db, Product, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_products():
    blue = Product(
        name='blue collar',
        seller_id=1,
        price=5.99,
        description="A blue colloar to put on your pet",
        image="https://s7d2.scene7.com/is/image/PetSmart/5253025?$sclp-prd-main_large$"
        )
    wet_food = Product(
        name='tikki cat',
        seller_id=2,
        price=2.99,
        description="Wet food to make your kitty happy",
        image='https://s7d2.scene7.com/is/image/PetSmart/5299007?$sclp-prd-main_large$'
        )
    bone= Product(
        name='dog bone',
        seller_id=3,
        price=7.99,
        description="Give a dog a bone",
        image='https://s7d2.scene7.com/is/image/PetSmart/5335637?$sclp-prd-main_large$'
        )
    litter= Product(
        name='kitty litter',
        seller_id=1,
        price=12.99,
        description="Very absorbant litter for your kit kats",
        image='https://s7d2.scene7.com/is/image/PetSmart/2621253?$sclp-prd-main_large$'
        )
    db.session.add(blue)
    db.session.add(wet_food)
    db.session.add(bone)
    db.session.add(litter)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
