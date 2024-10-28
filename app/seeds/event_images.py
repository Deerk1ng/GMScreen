from app.models import db, EventImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_event_images():
    rev1_pic1 = EventImage(
        url='https://thenerdd.com/wp-content/uploads/2020/06/dnd-5e-character-creation.jpg?w=840' ,preview=False , event_id=1)
    rev6_pic1 = EventImage(
        url='https://images.squarespace-cdn.com/content/v1/5f84db83e2665954761873a1/4063da63-7cd3-4764-9e94-1cd1972446a0/DSCF0805.jpg' ,preview=False , event_id=2)
    rev11_pic1 = EventImage(
        url='https://dmsjourney.com/wp-content/uploads/elementor/thumbs/Dungeons-and-Dragons-q2hmz2mfzb6cxd6l5f8vt4jc41piach9bmi22q00w0.jpg' ,preview=False , event_id=3)

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
