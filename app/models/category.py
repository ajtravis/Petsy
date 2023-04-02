from .db import db, environment, SCHEMA, add_prefix_for_prod
from .product_category import products_categories


class Category(db.Model):
    __tablename__ = 'categories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(40), nullable=False, unique=True)

    # relationships

    category_products = db.relationship("Product", secondary=products_categories, back_populates="product_categories")
