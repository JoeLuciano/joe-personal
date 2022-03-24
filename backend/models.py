from datetime import datetime
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from backend import db, login_manager
from flask_login import UserMixin


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True)
    title = db.Column(db.String(100), nullable=False, unique=True)
    image_file = db.Column(db.String(50), nullable=True,
                           default='default.jpg')
    date_posted = db.Column(db.DateTime, nullable=False,
                            default=datetime.utcnow)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f"Post('{self.title}', '{self.date_posted}')"

    @property
    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'date_posted': self.date_posted,
            'content': self.content,
            'user_id': self.user_id,
            'image_file': self.image_file,
            'author': User.query.filter_by(id=self.user_id).first().serialize
        }


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=True)
    phone = db.Column(db.String(20), unique=True, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=True)
    image_file = db.Column(db.String(50), nullable=False,
                           default='default.jpg')
    password = db.Column(db.String(60), nullable=True)
    posts = db.relationship('Post', backref='author', lazy=True)

    def __repr__(self):
        return str(self.serialize)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'phone': self.phone,
            'username': self.username,
            'email': self.email,
            'image_file': self.image_file
        }


class TweedleScores(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    phone = db.Column(db.String(20), unique=True, nullable=True)
    wins = db.Column(db.Integer, default=0)
    one_attempt_wins = db.Column(db.Integer, default=0)
    two_attempt_wins = db.Column(db.Integer, default=0)
    three_attempt_wins = db.Column(db.Integer, default=0)
    four_attempt_wins = db.Column(db.Integer, default=0)
    five_attempt_wins = db.Column(db.Integer, default=0)
    six_attempt_wins = db.Column(db.Integer, default=0)
