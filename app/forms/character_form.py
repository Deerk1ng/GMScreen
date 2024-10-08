# form
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired, ValidationError

class_choices = [('wizard', 'Wizard', 'WIZARD'),('rogue', 'Rogue', 'ROGUE'), ('paladin', 'Paladin', 'PALADIN')]
race_choices = [('human', 'Human', 'HUMAN'), ('elf', 'Elf', 'ELF'), ('half-orc', 'Half-Orc', 'HALF-ORC'), ('GOBLIN', 'Goblin', 'goblin')]
subclass_choices = [('Abjuration', 'abjuration', 'ABJURATION'),
                    ('Conjuration', 'conjuration', 'CONJURATION'),
                    ('Divination', 'divination', 'DIVINATION'),
                    ('Thief', 'thief', 'THIEF'),
                    ('Assassin', 'assassin', 'ASSASSIN'),
                    ('Arcane Trickster', 'arcane trickster', 'ARCANE TRICKSTER'),
                    ('Oath of Devotion', 'oath of devotion', 'OATH OF DEVOTION'),
                    ('Oath of the Ancients', 'oath of the ancients', 'OATH OF THE ANCIENTS'),
                    ('Oath of Vengeance', 'oath of vengeance', 'OATH OF VENGENCE')]

def ability_score_range(form, field):
    ability_score = field.data
    if ability_score < 8 or ability_score > 24:
        raise ValidationError("Ability Score must be greater than or equal to 8 and less than or equal to 24")

def level_range(form, field):
    level = field.data
    if level > 10:
        raise ValidationError("Level must be 10 or lower")

class CreateCharacterForm(FlaskForm):
    id = IntegerField('id', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
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
    backstory = IntegerField('backstory', validators=[DataRequired()])
    personality = IntegerField('personality', validators=[DataRequired()])
    appearance = IntegerField('appearance', validators=[DataRequired()])
    abilities = StringField('abilities')
    feats = StringField('feats')
    equipment = StringField('equipment')
    spells = StringField('spells')
