"""add_album_photos_table

Revision ID: 7487cd4b499e
Revises: 9476a9125aef
Create Date: 2021-06-07 01:43:59.446817

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7487cd4b499e'
down_revision = '9476a9125aef'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('album_photos',
    sa.Column('album_id', sa.Integer(), nullable=False),
    sa.Column('photo_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['album_id'], ['albums.id'], ),
    sa.ForeignKeyConstraint(['photo_id'], ['photos.id'], ),
    sa.PrimaryKeyConstraint('album_id', 'photo_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('album_photos')
    # ### end Alembic commands ###
