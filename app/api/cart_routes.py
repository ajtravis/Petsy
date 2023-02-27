from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Order, Cart_Item, Product, db
from app.forms import ProductForm
from app.api.auth_routes import validation_errors_to_error_messages

cart_routes = Blueprint('cart', __name__)

# get cart of current user
@cart_routes.route('/')
@login_required
def get_cart():
    order = Order.query.filter(Order.user_id == current_user.id and Order.closed == False).first()
    cart_items = Cart_Item.query.filter(Cart_Item.order_id == order.id).all()
    return {
        'cart_items': [item.to_dict() for item in cart_items],
        'order': order.to_dict()
    }

@cart_routes.route('/add/<int:id>', methods = ['POST'])
@login_required
def add_cart(id):
    order = Order.query.filter(Order.user_id == current_user.id and Order.closed == False).first()
    new_item = Cart_Item(
        product_id=id,
        quantity=1,
        order_id=order.id
    )
    db.session.add(new_item)
    db.session.commit()

    return new_item.to_dict()
