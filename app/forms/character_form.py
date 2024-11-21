# form
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, TextAreaField
from wtforms.validators import DataRequired, ValidationError

class_choices = [('Wizard'),('Rogue'), ('Paladin')]
race_choices = [('Human'), ('Elf'), ('Half-Orc'), ('Goblin')]
subclass_choices = [('Abjuration'),
                    ('Conjuration'),
                    ('Divination'),
                    ('Thief'),
                    ('Assassin'),
                    ('Arcane Trickster'),
                    ('Oath of Devotion'),
                    ('Oath of the Ancients'),
                    ('Oath of Vengeance')]

def ability_score_range(form, field):
    ability_score = field.data
    if ability_score < 8 or ability_score > 24:
        raise ValidationError("Ability Score must be greater than or equal to 8 and less than or equal to 24")

def level_range(form, field):
    level = field.data
    if level > 10:
        raise ValidationError("Level must be 10 or lower")

class CreateCharacterForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    level = IntegerField('level', validators=[DataRequired()])
    strength = IntegerField('strength', validators=[DataRequired(), ability_score_range])
    dexterity = IntegerField('dexterity', validators=[DataRequired(), ability_score_range])
    constitution = IntegerField('constitution', validators=[DataRequired(), ability_score_range])
    intelligence = IntegerField('intelligence', validators=[DataRequired(), ability_score_range])
    wisdom = IntegerField('wisdom', validators=[DataRequired(), ability_score_range])
    charisma = IntegerField('charisma', validators=[DataRequired(), ability_score_range])
    character_class = SelectField('character_class', choices=class_choices, validators=[DataRequired()])
    subclass = SelectField('subclass', choices=subclass_choices, validators=[DataRequired()])
    race = SelectField('race', choices=race_choices, validators=[DataRequired()])
    backstory = TextAreaField('backstory')
    personality = TextAreaField('personality')
    appearance = TextAreaField('appearance')
    abilities = StringField('abilities')
    feats = StringField('feats')
    equipment = StringField('equipment')
    spells = StringField('spells')
