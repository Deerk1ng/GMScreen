from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Campaign_character(db.Model):
    __tablename__ = 'campaign_characters'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('characters.id'), ondelete='CASCADE'), nullable=False)
    campaign_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('campaigns.id'), ondelete='CASCADE'), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), default=datetime.now(), nullable=False)

    character = db.relationship("Character", back_populates = "campaign")
    campaign = db.relationship("Campaign", back_populates= "characters")
