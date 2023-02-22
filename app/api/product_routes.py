from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Product, db
from app.forms import ProductForm
from app.api.auth_routes import validation_errors_to_error_messages

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
    products = Product.query.filter(Product.seller_id == current_user.id).all()
    return {'my_products': [product.to_dict() for product in products]}

# post a new product listing
@product_routes.route('/new', methods=['POST'])
@login_required
def add_product():
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newProduct = Product(
            name=form.data['name'],
            seller_id=current_user.id,
            price=form.data['price'],
            description=form.data['description'],
            image=form.data['image']
        )
        print("!!!!!!!!!!!!!!!!!!!!!!!!!", newProduct)
        db.session.add(newProduct)
        db.session.commit()
        return newProduct.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
