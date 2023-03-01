from app.models import db, Product, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_products():
    blue = Product(
        name='Blue Collar',
        seller_id=1,
        price=5.99,
        description="A blue colloar to put on your pet",
        image="https://s7d2.scene7.com/is/image/PetSmart/5253025?$sclp-prd-main_large$"
        )
    wet_food = Product(
        name='Tikki Cat',
        seller_id=2,
        price=2.99,
        description="Wet food to make your kitty happy",
        image='https://s7d2.scene7.com/is/image/PetSmart/5299007?$sclp-prd-main_large$'
        )
    bone= Product(
        name='Dog Bone',
        seller_id=3,
        price=7.99,
        description="Give a dog a bone",
        image='https://s7d2.scene7.com/is/image/PetSmart/5335637?$sclp-prd-main_large$'
        )
    litter= Product(
        name='Kitty Litter',
        seller_id=1,
        price=12.99,
        description="Very absorbant litter for your kit kats",
        image='https://s7d2.scene7.com/is/image/PetSmart/2621253?$sclp-prd-main_large$'
        )
    bed = Product(
        name='Dog Bed',
        seller_id=4,
        price=25.99,
        description="A bed for your dog to sleep in",
        image="https://s7d2.scene7.com/is/image/PetSmart/5325437?$sclp-prd-main_large$"
        )
    crate = Product(
        name='Dog Crate',
        seller_id=2,
        price=59.99,
        description="A crate for dogs",
        image='https://s7d2.scene7.com/is/image/PetSmart/5309333?$sclp-prd-main_large$'
        )
    carrier= Product(
        name='Pet Carrier',
        seller_id=3,
        price=49.99,
        description="A carrier to transport your pets",
        image='https://s7d2.scene7.com/is/image/PetSmart/5310341?$sclp-prd-main_large$'
        )
    tree= Product(
        name='Cat Tree',
        seller_id=1,
        price=54.99,
        description="A 24 in cat tree for your cats to lounge in.",
        image='https://s7d2.scene7.com/is/image/PetSmart/5181510?$sclp-prd-main_large$'
        )
    aquarium = Product(
        name='Aquarium',
        seller_id=4,
        price=40.99,
        description="A 3 gallon aquarium for your fish",
        image="https://s7d2.scene7.com/is/image/PetSmart/5321019?$sclp-prd-main_large$"
        )
    treats = Product(
        name='Dog Treats',
        seller_id=2,
        price=5.99,
        description="Dog treats made for good boys and good girls",
        image='https://s7d2.scene7.com/is/image/PetSmart/5297312?$sclp-prd-main_large$'
        )
    greenies= Product(
        name='Greenies',
        seller_id=3,
        price=8.99,
        description="Treats to help your dog with bad breath",
        image='https://s7d2.scene7.com/is/image/PetSmart/5266411?$sclp-prd-main_large$'
        )
    chair= Product(
        name='Guinea Pig Chair',
        seller_id=1,
        price=19.99,
        description="A leather chair the perfect size for a guinea pig.",
        image='https://s7d2.scene7.com/is/image/PetSmart/5329785?$sclp-prd-main_large$'
        )

    db.session.add(blue)
    db.session.add(wet_food)
    db.session.add(bone)
    db.session.add(litter)
    db.session.add(bed)
    db.session.add(crate)
    db.session.add(carrier)
    db.session.add(tree)
    db.session.add(aquarium)
    db.session.add(treats)
    db.session.add(greenies)
    db.session.add(chair)
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
