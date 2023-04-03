from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Category, db
from app.api.auth_routes import validation_errors_to_error_messages

category_routes = Blueprint('categories', __name__)

@category_routes.route('/all')
def all_categories():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    categories = Category.query.all()
    return {'categories': [c.to_dict() for c in categories]}


@category_routes.route('/<int:id>')
def set_cat(id):
    """
    Query for all users and returns them in a list of user dictionaries
    """
    selected = Category.query.get(id)
    return {'selected': selected.to_dict()}
