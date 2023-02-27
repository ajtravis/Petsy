from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Order, Cart_Item, Product, db
from app.forms import ItemForm
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
    product = Product.query.get(id)
    order.amount += product.price
    new_item = Cart_Item(
        product_id=id,
        quantity=1,
        order_id=order.id
    )
    db.session.add(new_item)
    db.session.commit()

    return new_item.to_dict()

# remove a product from your cart
@cart_routes.route('/delete/<int:id>/', methods = ['DELETE'])
@login_required
def remove_item(id):
    order = Order.query.filter(Order.user_id == current_user.id and Order.closed == False).first()
    item = Cart_Item.query.get(id)
    product = Product.query.get(item.product_id)
    order.amount -= (product.price * item.quantity)

    db.session.delete(item)
    db.session.commit()

    return {"message": f'product with id {product.id} successfully deleted'}

@cart_routes.route('/update/<int:id>/', methods = ['PUT'])
@login_required
def update_item(id):
    form = ItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        order = Order.query.filter(Order.user_id == current_user.id and Order.closed == False).first()
        item = Cart_Item.query.get(id)
        product = Product.query.get(item.product_id)
        num = item.quantity
        item.quantity=form.data['quantity']
        change = num - item.quantity
        order.amount += change * product.price

        db.session.commit()
        return {'item': item.to_dict(), 'order': order.to_dict()}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
