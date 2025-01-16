from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, TextAreaField
from wtforms.validators import DataRequired, ValidationError

class CreateCampaignCharacterForm(FlaskForm):
    character_id = IntegerField('character_id', validators=[DataRequired()])
    campaign_id = IntegerField('campaign_id', validators=[DataRequired()])
