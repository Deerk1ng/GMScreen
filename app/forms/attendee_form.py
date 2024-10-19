#attending form
from flask_wtf import FlaskForm
from wtforms import IntegerField, SelectField, BooleanField
from wtforms.validators import DataRequired

class CreateAttendeeForm(FlaskForm):
    # user_id = IntegerField('user_id', validators=[DataRequired()])
    # event_id = IntegerField('event_id', validators=[DataRequired()])
    status = SelectField('status', choices=[('attending', 'ATTENDING'), ('unsure', 'UNSURE'), ('owner', 'OWNER')], validators=[DataRequired()])
