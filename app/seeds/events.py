from app.models import db, Event, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_events():
    character_creation = Event(
        user_id = 2,
        name = "Character Creation",
        start_date = datetime(2024, 10, 31, 7),
        end_date = datetime(2024, 10, 31, 11),
        description = "Lets make characters for our newest campaign. Bring some ideas for a character that fits the setting discussed in session zero and together the table will make a group of adventurers for a collaborative storytelling experience",
        capacity = 6
    )

    session_zero = Event(
        user_id = 2,
        name = "Session Zero",
        start_date = datetime(2024, 10, 29, 7),
        end_date = datetime(2024, 10, 29, 9),
        description = "Please join me for an information session about the newest campaign I'm starting. Session zero will be a discussion on general rules and expectations as well as a chance for members to meet each other and bounce ideas off for character creation later.",
        capacity = 10
    )

    session_one = Event(
        user_id = 2,
        name = "Session One",
        start_date = datetime(2024, 11, 5, 7),
        end_date = datetime(2024, 11, 5, 11),
        description = "This is our opening session for our new campaign! Please bring your fully filled out character sheet and be prepared to discuss backstory and mechanics",
        capacity = 6
    )

    db.session.add(character_creation)
    db.session.add(session_zero)
    db.session.add(session_one)
    db.session.commit()

def undo_events():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.events RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM events"))

    db.session.commit()
