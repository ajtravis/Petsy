from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Product

product_routes = Blueprint('products', __name__)

@product_routes.route('/all')
def all_products():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    products = Product.query.all()
    return {'products': [product.to_dict() for product in products]}

# get a single product by id
@product_routes.route('/<int:id>')
def get_one_product(id):
    product = Product.query.get(id)
    return product.to_dict()

# get products of current user
@product_routes.route('/my_products')
@login_required
def my_products():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    products = Product.query.filter(Product.seller_id == current_user.id)
    return {'my_products': [product.to_dict() for product in products]}
