import os
from flask import Blueprint, request
from flask_cors import cross_origin
from flask_login import current_user, login_user, logout_user
from backend import db, bcrypt
from backend.models import User
from backend.backend import Message

users = Blueprint('users', __name__)


@users.route('/api/register', methods=['POST'])
@cross_origin()
def createUser():
    try:
        if current_user.is_authenticated:
            return Message.msg(f'{current_user.username} is currently authenticated'), 200
        userInfo = request.json
        if userInfo.get('secretCode') == os.getenv('SECRET_CODE'):
            hashed_password = bcrypt.generate_password_hash(
                userInfo.get('password')).decode('utf-8')
            user = User(username=userInfo.get('username'),
                        email=userInfo.get('email'), password=hashed_password)
            db.session.add(user)
            db.session.commit()
            login_user(user)
            return Message.data("Your account has been created! Set your username under 'Account'",
                                str(current_user)), 200
        else:
            return Message.msg('ERROR: Incorrect secret code'), 412
    except Exception as e:
        return Message.error(e), 400


@users.route("/api/login", methods=['POST'])
@cross_origin()
def login():
    try:
        if current_user.is_authenticated:
            return Message.msg(f'{current_user.username} is currently authenticated'), 200
        userInfo = request.json
        user = User.query.filter_by(email=userInfo.get('email')).first()
        if user and bcrypt.check_password_hash(user.password, userInfo.get('password')):
            login_user(user, remember=userInfo.get('remember'))
            return Message.msg('Login Successful!', str(current_user)), 200
        else:
            return Message.error('Login Unsuccessful'), 412
    except Exception as e:
        return Message.error(e), 400


@users.route("/api/logout", methods=['POST'])
@cross_origin()
def logout():
    try:
        if current_user.is_authenticated:
            logout_user()
            return Message.msg('Logout Successful!'), 200
        else:
            return Message.error('No user is logged in'), 412
    except Exception as e:
        return Message.error(e), 400


@users.route('/api/user', methods=['GET'])
@cross_origin()
def getUser():
    try:
        if current_user.is_authenticated:
            return Message.data('', str(current_user)), 200
        else:
            return Message.msg(''), 200
    except Exception as e:
        return Message.error(e), 400


@ users.route('/api/user/update', methods=['POST'])
@ cross_origin()
def updateUser():
    try:
        userInfo = request.json
        if current_user.is_authenticated:
            username = userInfo.get('username')
            if username:
                current_user.username = username
            email = userInfo.get('email')
            if email:
                current_user.email = email
            db.session.commit()
            return Message.msg('Your account has been updated!'), 200
        else:
            return Message.msg('No current user'), 412
    except Exception as e:
        return Message.error(e), 400
