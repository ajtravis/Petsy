from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Product

product_routes = Blueprint('products', __name__)

@product_routes.route('/all')
def all_products():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    products = Product.query.all()
    return {'products': [product.to_dict() for product in products]}
