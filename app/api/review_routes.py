from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Product, Review, db
from app.forms import ReviewForm


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_review(id):
    # print('asdkjasdjkasda')
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review = Review.query.get(id)
        review.rating=form.data['rating']
        review.review=form.data['review']

        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@review_routes.route('/delete/<int:id>/', methods = ['DELETE'])
@login_required
def remove_review(id):
    review = Review.query.get(id)

    db.session.delete(review)
    db.session.commit()

    return {"message": 'review successfully deleted'}
