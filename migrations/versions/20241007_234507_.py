"""empty message

Revision ID: f7e2219b3fdb
Revises:
Create Date: 2024-10-07 23:45:07.086883

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'f7e2219b3fdb'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    op.create_table('characters',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('level', sa.Integer(), nullable=False),
    sa.Column('strength', sa.Integer(), nullable=False),
    sa.Column('dexterity', sa.Integer(), nullable=False),
    sa.Column('constitution', sa.Integer(), nullable=False),
    sa.Column('intelligence', sa.Integer(), nullable=False),
    sa.Column('wisdom', sa.Integer(), nullable=False),
    sa.Column('charisma', sa.Integer(), nullable=False),
    sa.Column('character_class', sa.String(), nullable=False),
    sa.Column('subclass', sa.String(), nullable=False),
    sa.Column('race', sa.String(), nullable=False),
    sa.Column('backstory', sa.Text(), nullable=False),
    sa.Column('personality', sa.Text(), nullable=False),
    sa.Column('appearance', sa.Text(), nullable=False),
    sa.Column('abilities', sa.String(), nullable=True),
    sa.Column('feats', sa.String(), nullable=True),
    sa.Column('equipment', sa.String(), nullable=True),
    sa.Column('spells', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE characters SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('characters')
    op.drop_table('users')
    # ### end Alembic commands ###
