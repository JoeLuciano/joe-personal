import os
from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from flask_login import current_user, login_user, logout_user
from backend import db, bcrypt
from backend.models import User

users = Blueprint('users', __name__)


@users.route('/api/register', methods=['POST'])
@cross_origin()
def createUser():
    if current_user.is_authenticated:
        return jsonify(f'{current_user.username} is currently authenticated'), 200
    userInfo = request.json
    if userInfo.get('secretCode') == os.getenv('SECRET_CODE'):
        hashed_password = bcrypt.generate_password_hash(
            userInfo.get('password')).decode('utf-8')
        user = User(username=userInfo.get('username'),
                    email=userInfo.get('email'), password=hashed_password)
        db.session.add(user)
        db.session.commit()
        print('NEW USER CREATED')
        return jsonify({'message': 'Your account has been created! You are now able to log in',
                        'username': user.username}), 200
    else:
        print('ERROR: User attempted to input incorrect secret code')
        return jsonify('ERROR: Incorrect secret code'), 412


@users.route("/api/login", methods=['POST'])
@cross_origin()
def login():
    if current_user.is_authenticated:
        return jsonify(f'{current_user.username} is currently authenticated'), 200
    userInfo = request.json
    user = User.query.filter_by(email=userInfo.get('email')).first()
    if user and bcrypt.check_password_hash(user.password, userInfo.get('password')):
        login_user(user, remember=userInfo.get('remember'))
        print(current_user)
        return jsonify({'message': 'Login Successful!', 'username': current_user.username}), 200
    else:
        return jsonify('ERROR: Login Unsuccessful'), 412


@users.route("/api/logout", methods=['POST'])
@cross_origin()
def logout():
    if current_user.is_authenticated:
        logout_user()
        return jsonify({"You've been logged out"}), 200
    else:
        return jsonify('ERROR: No user is logged in'), 412


@users.route('/api/user', methods=['GET'])
@cross_origin()
def getUser():
    if current_user.is_authenticated:
        print(current_user)
        return jsonify({'username': current_user.username}), 200
    else:
        return jsonify('No current user'), 200


@users.route('/api/user/update', methods=['POST'])
@cross_origin()
def updateUser():
    userInfo = request.json
    if current_user.is_authenticated:
        username = userInfo.get('username')
        if username:
            current_user.username = username
        email = userInfo.get('email')
        if email:
            current_user.email = email
        db.session.commit()
        return jsonify({'message': 'Your account has been updated!'}), 200
    else:
        return jsonify('No current user'), 412
