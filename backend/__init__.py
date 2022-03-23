from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from backend.config import Config
from flask_cors import CORS
import os
import boto3
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from twilio.rest import Client

db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
login_manager = LoginManager()
login_manager.login_view = 'users.login'
login_manager.login_message_category = 'info'
limiter = Limiter(key_func=get_remote_address)

s3 = boto3.client("s3", aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
                  aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"))

account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
verify_sid = os.environ['TWILIO_VERIFY_SERVICE_SID']
verify_service = Client(account_sid, auth_token).verify.services(verify_sid)


def create_app(config_class=Config):
    app = Flask(__name__, static_folder='../build', static_url_path='')
    app.config.from_object(Config)
    CORS(app)

    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    limiter.init_app(app)

    from backend.users.routes import users
    from backend.posts.routes import posts
    from backend.files.routes import files
    from backend.tweedle.routes import tweedle

    app.register_blueprint(users)
    app.register_blueprint(posts)
    app.register_blueprint(files)
    app.register_blueprint(tweedle)

    return app
