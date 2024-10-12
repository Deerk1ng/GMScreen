from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Event(db.Model):
    __tablename__ = 'events'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    start_date = db.Column(db.DateTime(timezone=True), nullable=False)
    end_date = db.Column(db.DateTime(timezone=True), nullable=False)
    description = db.Column(db.Text, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), default=datetime.now(), nullable=False)

    user = db.relationship("User", back_populates = "events")
    event_image = db.relationship("EventImage", back_populates= "event")


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name' : self.name,
            'start_date' : self.start_date,
            'end_date' : self.end_date,
            'description' : self.description,
            'capacity' : self.capacity,
        }
