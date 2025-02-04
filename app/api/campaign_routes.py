# routes
from flask import Blueprint, jsonify, redirect, request
from app import db
from app.models import Campaign, Character
from flask_login import current_user, login_required
#import forms
from app.forms import CreateCampaignForm
campaign_routes = Blueprint('campaigns', __name__)

@campaign_routes.route('/current')
@login_required
def get_curr_campaigns():
    curr_user = current_user.to_dict()

    campaigns = db.session.query(Campaign).filter(Campaign.user_id == curr_user['id']).all()

    return { 'curr_campaigns' : [camp.to_dict() for camp in campaigns]}

@campaign_routes.route('/all')
@login_required
def get_all_campaigns():
    campaigns = db.session.query(Campaign).all()

    return { 'campaigns' : [camp.to_dict() for camp in campaigns] }

@campaign_routes.route('/', method=['POST'])
@login_required
def make_campaign():
    curr_user = current_user.to_dict()

    form = CreateCampaignForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        campaign = Campaign(
            user_id = curr_user['id'],
            name = form.data['name'],
            description = form.data['description']
        )
        db.session.add(campaign)
        db.session.commit()
        new_campaign = campaign.to_dict()
        return {'new_campaign' : new_campaign}, 201
    return {'errors' : form.errors}, 400

@campaign_routes.route('<int:campaign_id>', method=['PUT'])
@login_required
def update_campaign(campaign_id):
    curr_user = current_user.to_dict()

    camp_by_id = db.session.query(Campaign).filter(Campaign.id == campaign_id).first()

    if not camp_by_id:
        return {'errors': {'message': 'Campaign does not exist'}}, 404

    if camp_by_id.user_id != curr_user['id']:
        return {'errors': {'message': 'Unauthorized to edit this campaign'}}, 403


    form = CreateCampaignForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        camp_by_id.name = form.data['name'],
        camp_by_id.description = form.data['description']

        db.session.commit()
        new_campaign = camp_by_id.to_dict()
        return {'new_campaign' : new_campaign}, 201
    return {'errors' : form.errors}, 400

@campaign_routes.route('<int:campaign_id>', methods=['DELETE'])
@login_required
def delete_campaign(campaign_id):
    curr_user = current_user.to_dict()

    camp_by_id = db.session.query(Campaign).filter(Campaign.id == campaign_id).first()

    if not camp_by_id:
        return {'errors': {'message': 'Character does not exist'}}, 404

    if camp_by_id.user_id == curr_user['id']:
        db.session.delete(camp_by_id)
        db.session.commit()
        return {'message': "Campaign deleted successfully"}, 200

    return {'errors': {'message': 'Unauthorized to delete this campaign'}}, 403

@campaign_routes.route('/<int:campaign_id/characters')
@login_required
def get_campaign_chars(campaign_id):

    camp_by_id = db.session.query(Campaign).filter(Campaign.id == campaign_id).first()

    if not camp_by_id:
        return {'errors': {'message': 'Character does not exist'}}, 404

    characters = db.session.query(Character).filter(Character.campaign_id == campaign_id).all()

    return { 'curr_campaigns' : [char.to_dict() for char in characters]}

@campaign_routes.route('/<int:campaign_id/characters/new')
@login_required
def add_campaign_chars(campaign_id):
    campaigns = db.session.query(Campaign).filter(Campaign.id == campaign_id).first()

    # form = CreateCampaignCharacterForm()
    # form['csrf_token'].data = request.cookies['csrf_token']


    return {campaigns}
