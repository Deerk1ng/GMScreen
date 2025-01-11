from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, TextAreaField
from wtforms.validators import DataRequired, ValidationError

class CreateCampaignCharacterForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description')
