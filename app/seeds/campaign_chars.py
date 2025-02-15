# seeds
from app.models import db, environment, SCHEMA, Campaign_character
from sqlalchemy.sql import text

def seed_campaign_chars():
    campaign_characters = {

    }

    for name, attributes in campaign_characters.items():
        campaign_char = Campaign_character(name=name, **attributes)
        db.session.add(campaign_char)

    db.session.commit()

def undo_campaign_chars():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.campaign_characters RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM campaign_characters"))

    db.session.commit()
