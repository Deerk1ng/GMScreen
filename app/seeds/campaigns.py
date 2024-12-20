# seeds
from app.models import db, environment, SCHEMA, Campaign
from sqlalchemy.sql import text

def seed_campaigns():
    campaigns = {

    }

    for name, attributes in campaigns.items():
        campaign = Campaign(name=name, **attributes)
        db.session.add(campaign)

    db.session.commit()

def undo_characters():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.characters RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM characters"))

    db.session.commit()
