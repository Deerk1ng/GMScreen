from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired



class CreateImageForm(FlaskForm):
    url = StringField('url', validators=[DataRequired()])
    preview = BooleanField('preview', default=False)
