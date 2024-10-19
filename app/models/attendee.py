#attending model
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Attendee(db.Model):
    __tablename__ = 'attendees'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("events.id"), ondelete="CASCADE"), nullable=False)
    status = db.Column(db.String, nullable=False)

    user = db.relationship("User", back_populates = "event_attending")
    event = db.relationship("Event", back_populates = "attendees")

    def to_dict(self):
        return {
            'id' : self.id,
            'user_id' : self.user_id,
            'event_id' : self.event_id,
            'status' : self.status
        }
