from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Product

class ItemForm(FlaskForm):
    quantity = IntegerField('quantity', validators=[DataRequired()])
