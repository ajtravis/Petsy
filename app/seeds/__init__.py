from flask.cli import AppGroup
from .users import seed_users, undo_users
from .products import seed_products, undo_products
from .cart_items import seed_cart_items, undo_cart_items
from .orders import seed_orders, undo_orders
from .reviews import seed_reviews, undo_reviews
from .categories import seed_categories, undo_categories
from .product_categories import seed_product_categories
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_cart_items()
        undo_orders()
        undo_products()
        undo_reviews()
        undo_categories()




    seed_users()

    seed_products()
    seed_orders()
    seed_cart_items()
    seed_reviews()
    seed_categories()
    seed_product_categories()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_cart_items()
    undo_orders()
    undo_products()
    undo_reviews()
    undo_categories()


    # Add other undo functions here
