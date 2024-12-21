# seeds
from app.models import db, environment, SCHEMA, Campaign
from sqlalchemy.sql import text

def seed_campaigns():
    campaigns = {
        "Modern Magic": {
            "description" : "A fantasy world with a modern twist! Go on dragon slaying adventures with access to technology like trains, skyscrapers, and even phones"
        },
        "Waterdeep Dragon Heist": {
            "description" : "Waterdeep is an expansive city in the Forgotten Realms and suddenly, thousands of gold pieces have gone missing. Its your job to find whoever took them and bring the gold back to the city... or keep them"
        },
        "Curse of Strahd" : {
            "description" : "Ravenloft has been cursed for centuries, overseen by the vampiric dictator, Von Strahd. Will you be able to escape the mist surrounding the valley or will you succumb to the curse of strahd"
        }
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
