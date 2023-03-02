from flask_wtf import FlaskForm
from wtforms import SelectField
from wtforms.validators import DataRequired


class ItemForm(FlaskForm):
    quantity = SelectField('quantity', choices=range(1,13), validators=[DataRequired()])
