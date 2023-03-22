from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Product, Review, db

review_routes = Blueprint('reviews', __name__)

