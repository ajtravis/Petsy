from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Product, Cart_Item, Order, Review, Category, db
from app.forms import ProductForm, ReviewForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.api.aws_helpers import upload_file_to_s3, get_unique_filename


product_routes = Blueprint('products', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

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
        image = form.data['image']
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 402

        img=upload["url"]

        newProduct = Product(
            name=form.data['name'],
            seller_id=current_user.id,
            price=form.data['price'],
            description=form.data['description'],
            image=img
        )

        db.session.add(newProduct)
        db.session.commit()
        return newProduct.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# delete a product that you own
@product_routes.route('/<int:id>/', methods = ['DELETE'])
@login_required
def delete_prod(id):
    product = Product.query.get(id)
    cart_items = Cart_Item.query.filter(Cart_Item.product_id == id)
    user_orders = Order.query.filter(Order.user_id == current_user.id).all()
    for o in user_orders:
        if o.closed == False:
            order = o
    for item in cart_items:
        if item.order_id == order.id:
            order.amount -= (item.quantity * product.price)
        db.session.delete(item)
    db.session.delete(product)
    db.session.commit()
    return {"message": f'product with id {product.id} successfully deleted'}

# update a product that you have listed
@product_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_product(id):
    # print('asdkjasdjkasda')
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        product = Product.query.get(id)
        product.name=form.data['name']
        product.seller_id=current_user.id
        product.price=form.data['price']
        product.description=form.data['description']
        product.image=form.data['image']

        db.session.commit()
        return product.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# get all reviews for a product
@product_routes.route('/<int:id>/reviews')
def get_reviews(id):
    product = Product.query.get(id)
    reviews = Review.query.filter(Review.product_id == product.id).all()
    return {'reviews': [review.to_dict() for review in reviews]}

# Post a product review
@product_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
def post_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_review = Review(
            user_id=current_user.id,
            product_id=id,
            review=form.data['review'],
            rating=form.data['rating']
        )
        db.session.add(new_review)
        db.session.commit()


        return new_review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@product_routes.route('/categories/<int:id>')
def filtered_products(id):
    """
    Query for all users and returns them in a list of user dictionaries
    """

    category = Category.query.get(id).to_dict()


    return {'cat_products': category["products"]}

@product_routes.route('/<int:id>/categories/<int:catId>')
def set_category(id, catId):
    product = Product.query.get(id)
    category = Category.query.get(catId)
    product.product_categories.append(category)
    db.session.commit()
    return product.to_dict()

@product_routes.route('/<int:id>/categories/<int:catId>/remove')
def remove_category(id, catId):
    product = Product.query.get(id)
    category = Category.query.get(catId)
    product.product_categories.remove(category)
    db.session.commit()
    return product.to_dict()
