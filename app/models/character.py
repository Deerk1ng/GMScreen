# models
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Character(db.Model):
    __tablename__ = 'characters'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    level = db.Column(db.Integer, nullable=False)
    strength = db.Column(db.Integer, nullable=False)
    dexterity = db.Column(db.Integer, nullable=False)
    constitution = db.Column(db.Integer, nullable=False)
    intelligence = db.Column(db.Integer, nullable=False)
    wisdom = db.Column(db.Integer, nullable=False)
    charisma = db.Column(db.Integer, nullable=False)
    character_class = db.Column(db.String, nullable=False)
    subclass = db.Column(db.String, nullable=False)
    race = db.Column(db.String, nullable=False)
    backstory = db.Column(db.Text, nullable=False)
    personality = db.Column(db.Text, nullable=False)
    appearance = db.Column(db.Text, nullable=False)
    abilities = db.Column(db.String)
    feats = db.Column(db.String)
    equipment = db.Column(db.String)
    spells = db.Column(db.String)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), default=datetime.now(), nullable=False)

    user = db.relationship("User", back_populates = "characters")
    # campaign = db.relationship("Campaign_character", back_populates='character', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id' : self.id,
            'user_id' : self.user_id,
            'name' : self.name,
            'level' : self.level,
            'strength' : self.strength,
            'dexterity' : self.dexterity,
            'constitution' : self.constitution,
            'intelligence' : self.intelligence,
            'wisdom' : self.wisdom,
            'charisma' : self.charisma,
            'character_class' : self.character_class,
            'subclass' : self.subclass,
            'race' : self.race,
            'backstory' : self.backstory,
            'personality' : self.personality,
            'appearance' : self.appearance,
        }

    def list_abilities(self):
        abilities_arr = self.abilities.split(",")
        return abilities_arr

    def list_feats(self):
        if(len(self.feats)):
            feats_arr = self.feats.split(",")
            return feats_arr

    def list_equipment(self):
        if(self.equipment):
            equipment_arr = self.equipment.split(",")
            return equipment_arr
