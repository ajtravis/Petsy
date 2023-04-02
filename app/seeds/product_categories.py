from app.models import products_categories, db, environment, SCHEMA, Product, Category

def seed_product_categories():


    dog = Category.query.get(1)
    cat = Category.query.get(2)
    fish = Category.query.get(3)
    bird = Category.query.get(4)
    plant = Category.query.get(5)
    rodent = Category.query.get(6)
    food = Category.query.get(7)
    toy = Category.query.get(8)
    treat = Category.query.get(9)
    crate = Category.query.get(10)
    furniture = Category.query.get(11)
    lizard = Category.query.get(12)
    tank = Category.query.get(13)
    misc = Category.query.get(14)
    health = Category.query.get(15)

    collar = Product.query.get(1)
    collar.product_categories.append(dog)
    collar.product_categories.append(cat)
    collar.product_categories.append(misc)

    tiki = Product.query.get(2)
    tiki.product_categories.append(food)
    tiki.product_categories.append(cat)

    bone_toy = Product.query.get(3)
    bone_toy.product_categories.append(dog)
    bone_toy.product_categories.append(toy)

    litter = Product.query.get(4)
    litter.product_categories.append(cat)
    litter.product_categories.append(misc)

    dog_bed = Product.query.get(5)
    dog_bed.product_categories.append(dog)
    dog_bed.product_categories.append(furniture)

    dog_crate = Product.query.get(6)
    dog_crate.product_categories.append(dog)
    dog_crate.product_categories.append(crate)

    carrier = Product.query.get(7)
    carrier.product_categories.append(dog)
    carrier.product_categories.append(cat)
    carrier.product_categories.append(crate)

    cat_tree = Product.query.get(8)
    cat_tree.product_categories.append(cat)
    cat_tree.product_categories.append(furniture)

    aquarium = Product.query.get(9)
    aquarium.product_categories.append(fish)
    aquarium.product_categories.append(tank)

    dog_treats = Product.query.get(10)
    dog_treats.product_categories.append(dog)
    dog_treats.product_categories.append(treat)

    greenies = Product.query.get(11)
    greenies.product_categories.append(dog)
    greenies.product_categories.append(treat)
    greenies.product_categories.append(health)

    chair = Product.query.get(12)
    chair.product_categories.append(rodent)
    chair.product_categories.append(furniture)
    chair.product_categories.append(misc)

    db.session.commit()
    