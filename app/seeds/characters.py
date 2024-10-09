# seeds
from app.models import db, environment, SCHEMA, Character
from sqlalchemy.sql import text

def seed_characters():
    characters = {
        "Camilla Hect" : {
            "user_id": 1,
            "level": 1,
            "strength": 8,
            "dexterity": 10,
            "constitution": 12,
            "intelligence": 13,
            "wisdom": 14,
            "charisma": 15,
            "character_class": 'rogue',
            "subclass": "Assassin",
            "race": "Human",
            "backstory": "Camila is the knight devoted to her childhood friend and distant cousin, Palamedes. Palamedes is currently missing and her mission is to find and save him",
            "personality": "Devoted, Intelligent, Slightyly Gullible",
            "appearance": "Tall, Strong features, long black hair, purple eyes, shining almost new clothing",
            "feats": "none",
            "equipment": "medium armor,rapier,shattered human skull",
            "abilities": "Expertise,Sneak Attack,Thieves' Cant",
            "spells": "none"},
        "Harrowhark Nona Gesimus": {"user_id": 2, "level": 1, "strength": 8, "dexterity": 10, "constitution": 12, "intelligence": 13, "wisdom": 14, "charisma": 15, "character_class": 'wizard', "subclass": "Conjuration", "race": "Elf", "backstory": "Harrowhark is a wizard hunting down the ultimate taboo: Lichhood. She's esconced herself in the dark arts to hunt down immortality through any means necessary", "personality": "Snarky, Immoral, Cunning, Anxious", "appearance": "Harrowhark is a devoutly religious member of a cult that worships the dead. She covers a lot of her features in long flowy clothing, with a hood and skull facepaint obscuring her face", "feats": "none", "equipment": "light armor,spellbook,face paint", "abilities": "Arcane Recovery,Ritual Casting", "spells": "Fire Bolt,Mage Hand,Prestidigitation,Burning Hands,Color Spray"},
        "Gideon Nav" : {"user_id": 3, "level": 1, "strength": 8, "dexterity": 10, "constitution": 12, "intelligence": 13, "wisdom": 14, "charisma": 15, "character_class": 'paladin', "subclass": "Oath of Devotion", "race": "Half-Orc", "backstory": "Gideon is the indentured servant of Harrowhark, and also occassionally her conscience. She's seeking to help Harrowhark meet her goals after which she was promised freedom", "personality": "Naive, Loving, Kind, Fierce", "appearance": "Gideon doesn't care much for her own appearance so her clothing is pretty shabby and worn, however you will never see her without her gigantic two handed sword", "feats": "none", "equipment": "heavy armor,longsword,holy relic", "abilities": "Divine Sense,Lay on Hands", "spells": "none"},
    }

    for name, attributes in characters.items():
        character = Character(name=name, **attributes)
        db.session.add(character)

    db.session.commit()

def undo_characters():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.characters RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM characters"))

    db.session.commit()
