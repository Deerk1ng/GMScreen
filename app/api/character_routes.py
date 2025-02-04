# routes
from flask import Blueprint, jsonify, redirect, request
from app import db
from app.models import Character
from flask_login import current_user, login_required
#import forms
from app.forms import CreateCharacterForm
character_routes = Blueprint('characters', __name__)

# get all characters of current user
@character_routes.route('/current')
@login_required
def get_curr_chars():
    """
        Query for all characters of current user and
        return them in a list of char dictionaries
    """
    curr_user = current_user.to_dict()

    characters = db.session.query(Character).filter(Character.user_id == curr_user['id']).all()

    return {'characters' : [char.to_dict() for char in characters]}

# create a character
@character_routes.route('/', methods=['POST'])
@login_required
def create_char():
    """
        Query to create an character and return the new character in a dictionary
    """
    curr_user = current_user.to_dict()

    form = CreateCharacterForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        character = Character(
            user_id = curr_user['id'],
            name = form.data['name'],
            level = form.data['level'],
            strength = form.data['strength'],
            dexterity = form.data['dexterity'],
            constitution =  form.data['constitution'],
            intelligence = form.data['intelligence'],
            wisdom = form.data['wisdom'],
            charisma =  form.data['charisma'],
            character_class = form.data['character_class'],
            subclass = form.data['subclass'],
            race = form.data['race'],
            backstory = form.data['backstory'],
            personality =  form.data['personality'],
            appearance = form.data['appearance'],
        )
        db.session.add(character)
        db.session.commit()
        new_char = character.to_dict()

        return {'created_char' : new_char}, 201

    return {'errors' : form.errors}, 400
# update character by character id
@character_routes.route('<int:char_id>', methods=['PUT'])
@login_required
def edit_char(char_id):
    """
        Query to edit an already existing character and
        return the edited character in a dictionary
    """
    curr_user = current_user.to_dict()

    char_by_id = db.session.query(Character).filter(Character.id == char_id).first()

    if not char_by_id:
        return {'errors': {'message': 'Character does not exist'}}, 404

    if char_by_id.user_id != curr_user['id']:
        return {'errors': {'message': 'Unauthorized to edit this character'}}, 403

    form = CreateCharacterForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        char_by_id.user_id = curr_user['id']
        char_by_id.name = form.data['name']
        char_by_id.level = form.data['level']
        char_by_id.strength = form.data['strength']
        char_by_id.dexterity = form.data['dexterity']
        char_by_id.constitution =  form.data['constitution']
        char_by_id.intelligence = form.data['intelligence']
        char_by_id.wisdom = form.data['wisdom']
        char_by_id.charisma =  form.data['charisma']
        char_by_id.character_class = form.data['character_class']
        char_by_id.subclass = form.data['subclass']
        char_by_id.race = form.data['race']
        char_by_id.backstory = form.data['backstory']
        char_by_id.personality =  form.data['personality']
        char_by_id.appearance = form.data['appearance']

        db.session.commit()
        updated_char = char_by_id.to_dict()
        return {'updated_char': updated_char}, 200

    return {'errors': form.errors}, 400


# delete character by character id
@character_routes.route('<int:char_id>', methods=['DELETE'])
@login_required
def delete_char(char_id):
    curr_user = current_user.to_dict()

    char_by_id = db.session.query(Character).filter(Character.id == char_id).first()

    if not char_by_id:
        return {'errors': {'message': 'Character does not exist'}}, 404

    if char_by_id.user_id == curr_user['id']:
        db.session.delete(char_by_id)
        db.session.commit()
        return {'message': "Character deleted successfully"}, 200

    return {'errors': {'message': 'Unauthorized to delete this character'}}, 403

# get all characters by event id

# get all characters of current campaign (?)

# add character to campaign
