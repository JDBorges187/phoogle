"""add_date_created_to_photos

Revision ID: 5dd98b9e1b41
Revises: 77fd52b4fe10
Create Date: 2021-06-04 23:49:19.743538

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5dd98b9e1b41'
down_revision = '77fd52b4fe10'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('photos', sa.Column('date_created', sa.DateTime(), nullable=True))
    op.execute("UPDATE photos SET date_created = NOW()")
    op.alter_column('photos', 'date_created', nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('photos', 'date_created')
    # ### end Alembic commands ###
