from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    seller_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    price= db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=False)
    image = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # relationships
    product_user = db.relationship("User", back_populates="user_product")
    product_item = db.relationship("Cart_Item", back_populates="item_product")
    product_review = db.relationship("Review", back_populates="review_product")

    

    def to_dict(self):
        n = 0
        for r in self.product_review:
            n += r.rating
        avg = self.product_review
        if len(avg):
            avg = n/len(avg)
        else:
            avg = 0
        return {
            'id': self.id,
            'name': self.name,
            'seller_id': self.seller_id,
            'price': self.price,
            'description': self.description,
            'image': self.image,
            'created_at': self.created_at,
            'avg': avg

        }
