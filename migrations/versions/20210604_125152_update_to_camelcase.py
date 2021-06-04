"""update to camelcase

Revision ID: 77fd52b4fe10
Revises: f4210c431197
Create Date: 2021-06-04 12:51:52.182665

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '77fd52b4fe10'
down_revision = 'f4210c431197'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('photos', sa.Column('owner_id', sa.Integer(), nullable=True))
    op.drop_constraint('photos_ownerId_fkey', 'photos', type_='foreignkey')
    op.create_foreign_key(None, 'photos', 'users', ['owner_id'], ['id'])
    op.drop_column('photos', 'ownerId')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('photos', sa.Column('ownerId', sa.INTEGER(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'photos', type_='foreignkey')
    op.create_foreign_key('photos_ownerId_fkey', 'photos', 'users', ['ownerId'], ['id'])
    op.drop_column('photos', 'owner_id')
    # ### end Alembic commands ###