from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app import db
from app.models import Event, EventImage
from app.forms import CreateEventForm, CreateImageForm
from datetime import datetime
event_routes = Blueprint('events', __name__)

@event_routes.route('/')
@login_required
def events():
    """
        Query for all events and return them in a list of event dictionaries
    """
    events = Event.query.all()
    events_list = []
    for event in events:
        event_dict = event.to_dict()

        image = db.session.query(EventImage).filter(EventImage.event_id == event.id).first()
        if(image):
            event_dict['image'] = image.to_dict()
        else:
            event_dict['image'] = []
        if event_dict['start_date'].strftime("%b %d") == event_dict['end_date'].strftime("%b %d"):
            event_dict['start_date'] = event_dict['start_date'].strftime("%A %b %d, %Y %-I:%M %p")
            event_dict['end_date'] = event_dict['end_date'].strftime("%-I:%M %p")
        else:
            event_dict['start_date'] = event_dict['start_date'].strftime("%A %b %d, %Y %-I:%M %p")
            event_dict['end_date'] = event_dict['end_date'].strftime("%A %b %d, %Y %-I:%M %p")
        events_list.append(event_dict)

    return {'events': events_list}, 200

@event_routes.route('/<int:event_id>')
@login_required
def event_by_id(event_id):
    """
        Query for one event by id and return it in a dictionary
    """
    event = db.session.query(Event).filter(Event.id == event_id).first()
    event = event.to_dict()
    if not event:
        return {'error': 'Event does not exist'}, 404

    image = db.session.query(EventImage).filter(EventImage.event_id == event['id']).first()

    if image:
        image = image.to_dict()

    event['image'] = image

    return {'event': event}

@event_routes.route('/', methods=['POST'])
@login_required
def create_event():
    """
        Query to create an event and return the new event in a dictionary
    """
    currentUser = current_user.to_dict()

    form = CreateEventForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data['start_date'], form.data['end_date'])
    # form.data['start_date'] = datetime(form.data['start_date'])
    # form.data['end_date'] = datetime(form.data['end_date'])


    if form.validate_on_submit():
        event = Event(
            user_id = currentUser['id'],
            name = form.data['name'],
            start_date = form.data['start_date'],
            end_date = form.data['end_date'],
            description = form.data['description'],
            capacity = form.data['capacity'],
        )

        db.session.add(event)
        db.session.commit()
        new_event = event.to_dict()

        return {'created_event': new_event}, 201

    return {'errors': form.errors}, 400

@event_routes.route('/<int:event_id>/images', methods=['POST'])
@login_required
def add_image_to_event(event_id):
    """
        Query to add an image to an event and return the edited event in a dictionary
    """
    curr_user = current_user.to_dict()

    event_by_id = db.session.query(Event).filter(Event.id == event_id).first()

    if not event_by_id:
        return {'error': 'Event does not exist'}, 404

    event_by_id = event_by_id.to_dict()

    if event_by_id['user_id'] != curr_user['id']:
        return {'errors': {'message': 'Unauthorized to edit this product'}}, 403

    event_image = image = db.session.query(EventImage).filter(EventImage.event_id == event_id).first()

    if event_image:
        return {'error': 'Event already has an image'}, 401

    form = CreateImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        image = EventImage(
            url = form.data['url'],
            event_id = event_id
        )

        db.session.add(image)
        db.session.commit()
        new_image = image.to_dict()

        return {'new_image': new_image}

    return form.errors, 400


@event_routes.route('/<int:event_id>', methods=['PUT'])
@login_required
def edit_event(event_id):
    """
        Query to edit an already existing event and return the edited event in a dictionary
    """
    currentUser = current_user.to_dict()

    event_by_id = db.session.query(Event).filter(Event.id == event_id).first()

    if not event_by_id:
        return {'errors': {'message': 'Product does not exist'}}, 404

    if event_by_id.user_id != currentUser['id']:
        return {'errors': {'message': 'Unauthorized to edit this product'}}, 403

    form = CreateEventForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        event_by_id.name = form.data['name']
        event_by_id.price = form.data['start_date']

        event_by_id.price = form.data['end_date']

        event_by_id.description = form.data['description']

        event_by_id.category = form.data['capacity']

        db.session.commit()

        updated_product = event_by_id.to_dict()

        return {'updated_product': updated_product}, 200

    return {'errors': form.errors}, 400

@event_routes.route('/<int:event_id>', methods=['DELETE'])
@login_required
def delete_event(event_id):
    currentUser = current_user.to_dict()

    event_by_id = db.session.query(Event).filter(Event.id == event_id).first()

    if not event_by_id:
        return {'errors': {'message': 'Product does not exist'}}, 404

    if event_by_id.user_id == currentUser['id']:
        db.session.delete(event_by_id)
        db.session.commit()
        return {'message': "Event deleted successfuly"}, 200

    return {'errors': {'message': 'Unauthorized to edit this product'}}, 403


#delete event image
@event_routes.route('/<int:event_id>/images', methods=['DELETE'])
@login_required
def delete_event_image(event_id):
    """
        Query to add an image to an event and return the edited event in a dictionary
    """
    curr_user = current_user.to_dict()

    event_by_id = db.session.query(Event).filter(Event.id == event_id).first()

    if not event_by_id:
        return {'error': 'Event does not exist'}, 404

    event_by_id = event_by_id.to_dict()

    if event_by_id['user_id'] != curr_user['id']:
        return {'errors': {'message': 'Unauthorized to edit this product'}}, 403

    event_image = db.session.query(EventImage).filter(EventImage.event_id == event_id).first()

    if event_image:
        db.session.delete(event_image)
        db.session.commit()
        return {'message': "Image deleted successfuly"}, 200
    return {'error': 'Event already has an image'}, 401

#edit event image
@event_routes.route('/<int:event_id>/images', methods=['PUT'])
@login_required
def edit_image_for_event(event_id):
    curr_user = current_user.to_dict()

    event_by_id = db.session.query(Event).filter(Event.id == event_id).first()

    if not event_by_id:
        return {'error': 'Event does not exist'}, 404

    event_by_id = event_by_id.to_dict()

    if event_by_id['user_id'] != curr_user['id']:
        return {'errors': {'message': 'Unauthorized to edit this product'}}, 403

    event_image = db.session.query(EventImage).filter(EventImage.event_id == event_id).first()

    if event_image:
        event_image = event_image.to_dict()
        form = CreateImageForm()

        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            event_image['url'] = form.data['url'],

            db.session.commit()
            updated_image = event_image

            return {'new_image': updated_image}
        return {'errors': form.errors}, 400
    return {'error': 'Event has no image'}, 404
