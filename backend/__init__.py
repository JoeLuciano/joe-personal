from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
# from flask_mail import Mail
from backend.config import Config
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
login_manager = LoginManager()
login_manager.login_view = 'users.login'
login_manager.login_message_category = 'info'
# mail = Mail()


def create_app(config_class=Config):
    app = Flask(__name__, static_folder='../build', static_url_path='')
    app.config.from_object(Config)
    CORS(app)

    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    # mail.init_app(app)

    from backend.users.routes import users
    from backend.posts.routes import posts
    app.register_blueprint(users)
    app.register_blueprint(posts)
    # from flaskblog.main.routes import main
    # from flaskblog.errors.handlers import errors
    # app.register_blueprint(main)
    # app.register_blueprint(errors)

    return app
