# routes
from flask import Blueprint, jsonify, redirect, request
from app import db
from app.models import Campaign
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

@campaign_routes.route('/', method=['PUT'])
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
