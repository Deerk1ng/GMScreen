from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod

class EventImage(db.Model):
    __tablename__= 'event_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255), nullable=False)
    preview = db.Column(db.Boolean)
    event_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('events.id'), ondelete="CASCADE"), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), default=datetime.now(), nullable=False)

    event = db.relationship('Event', back_populates='event_image')


    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'preview': self.preview,
            'event_id': self.event_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
