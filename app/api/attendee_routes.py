#attending routes
from flask import Blueprint, request
from flask_login import login_required, current_user
from app import db
from app.models import Event, Attendee
from app.forms import CreateAttendeeForm
attendee_routes = Blueprint('attendees', __name__)


#get attendees by user id


#edit attendees by attendee id
@attendee_routes.route('/<int:attendee_id>', methods=['PUT'])
@login_required
def edit_attendee_status(attendee_id):
    """
        Query to change the status of an attendance and return the edited attendee in a dictionary
    """
    curr_user = current_user.to_dict()

    attendee_by_id = db.session.query(Attendee).filter(Attendee.id == attendee_id).first()
    att_dict = attendee_by_id.to_dict()
    if not attendee_by_id:
        return {'errors' : 'This attendance record does not exist'}, 404

    event_by_id = db.session.query(Event).filter(Event.id == att_dict['event_id']).first()
    event_dict = event_by_id.to_dict()
    if att_dict['user_id'] != curr_user['id']:
        return {'errors': {'message': 'Unauthorized to edit this attendance record'}}, 403

    if event_dict['user_id'] == curr_user['id']:
        return {'errors' : 'User is the owner of the event'}, 403

    form = CreateAttendeeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        attendee_by_id.status = form.data['status']

        db.session.commit()

        return {'updated_attendance' : attendee_by_id.to_dict()}, 200

    return {'errors': form.errors}, 400

#delete attendee by attendee id
@attendee_routes.route('/<int:attendee_id>', methods=['DELETE'])
@login_required
def delete_attendee_status(attendee_id):
    curr_user = current_user.to_dict()

    attendee_by_id = db.session.query(Attendee).filter(Attendee.id == attendee_id).first()
    if not attendee_by_id:
        return {'errors' : 'This attendance record does not exist'}, 404

    if attendee_by_id.user_id == curr_user['id']:
        db.session.delete(attendee_by_id)
        db.session.commit()
        return {'message' : 'Attendance deleted successfully'}, 200

    return {'errors': {'message': 'Unauthrized to delete this attendance record'}}, 403
