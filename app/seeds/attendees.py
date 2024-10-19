#attending seeders
from app.models import db, Attendee, environment, SCHEMA
from sqlalchemy.sql import text

def seed_attendees():
    marnie_1 = Attendee(
        user_id = 2,
        event_id = 1,
        status = "owner",
    )
    marnie_2 = Attendee(
        user_id = 2,
        event_id = 2,
        status = "owner",
    )
    marnie_3 = Attendee(
        user_id = 2,
        event_id = 3,
        status = "owner",
    )
    bobby_1 = Attendee(
        user_id = 3,
        event_id = 1,
        status = "attending",
    )
    bobby_2 = Attendee(
        user_id = 3,
        event_id = 2,
        status = "attending",
    )
    bobby_3 = Attendee(
        user_id = 3,
        event_id = 3,
        status = "unsure",
    )
    demo_1 = Attendee(
        user_id = 1,
        event_id = 1,
        status = "attending"
    )

    db.session.add(marnie_1)
    db.session.add(marnie_2)
    db.session.add(marnie_3)
    db.session.add(bobby_1)
    db.session.add(bobby_2)
    db.session.add(bobby_3)
    db.session.add(demo_1)
    db.session.commit()


def undo_attendees():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.attendees RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM attendees"))

    db.session.commit()
