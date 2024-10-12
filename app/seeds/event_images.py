from app.models import db, EventImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_event_images():
    rev1_pic1 = EventImage(
        url='https://craftyproject.s3.us-east-2.amazonaws.com/belt4.jpg' ,preview=False , event_id=1)
    rev6_pic1 = EventImage(
        url='https://craftyproject.s3.us-east-2.amazonaws.com/cloak5.jpg' ,preview=False , event_id=2)
    rev11_pic1 = EventImage(
        url='https://craftyproject.s3.us-east-2.amazonaws.com/tunic4.jpg' ,preview=False , event_id=3)

    db.session.add(rev1_pic1)
    db.session.add(rev6_pic1)
    db.session.add(rev11_pic1)
    db.session.commit()


def undo_event_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.event_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM event_images"))

    db.session.commit()
