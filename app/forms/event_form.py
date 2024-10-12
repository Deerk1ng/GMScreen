# form
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired, ValidationError
from datetime import datetime

def date_in_future_validate(form, field):
    current_time = datetime.now()
    field_date = field.data

    if(field_date < current_time):
        raise ValidationError("Event must begin and end in the future")

def start_end_validate(form, field):
    start_date = form.data['start_date']
    end_date = field.data

    if(end_date < start_date):
        raise ValidationError("Event must end after the start date")

class CreateEventForm(FlaskForm):

    name = StringField('name', validators=[DataRequired()])
    start_date = DateTimeField('start_date', validators=[DataRequired(), date_in_future_validate])
    end_date = DateTimeField('end_date', validators=[DataRequired(), date_in_future_validate, start_end_validate])
    description = StringField('description', validators=[DataRequired()])
    capacity = IntegerField('num_attending', validators=[DataRequired()])
