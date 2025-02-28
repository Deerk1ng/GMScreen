# seeds
from app.models import db, environment, SCHEMA, Campaign_character
from sqlalchemy.sql import text

def seed_campaign_chars():
    demo1 = Campaign_character(
        character_id= 1, campaign_id = 2
    )
    demo2 = Campaign_character(
        character_id= 1, campaign_id = 3
    )
    demo3 = Campaign_character(
        character_id= 2, campaign_id = 2
    )
    demo4 = Campaign_character(
        character_id= 3, campaign_id = 3
    )
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.commit()

def undo_campaign_chars():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.campaign_characters RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM campaign_characters"))

    db.session.commit()
