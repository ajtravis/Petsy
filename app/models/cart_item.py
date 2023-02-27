from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Cart_Item(db.Model):
    __tablename__ = 'cart_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("orders.id")), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # relationships
    item_product = db.relationship("Product", back_populates="product_item")
    item_order = db.relationship("Order", back_populates="order_item")

    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'quantity': self.quantity,
            'order_id': self.order_id,
            'created_at': self.created_at,
            'product': self.item_product.to_dict(),
            'order': self.item_order.to_dict()
        }
