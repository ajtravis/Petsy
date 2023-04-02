from .db import db, environment, SCHEMA, add_prefix_for_prod


products_categories = db.Table(
    'products_categories',
    db.Model.metadata,
    db.Column('product_id', db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), primary_key=True ),
    db.Column('category_id', db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id')), primary_key=True )
)


if environment == "production":
    products_categories.schema = SCHEMA
