# from .db import db, environment, SCHEMA, add_prefix_for_prod


# product_categories = db.Table(
#     'product_categories',
#     db.Model.metadata,
#     db.Column('product_id', db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), primary_key=True ),
#     db.Column('category_id', db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id')), primary_key=True )
# )


# if environment == "production":
#     product_categories.schema = SCHEMA
