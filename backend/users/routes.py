import os
from flask import Blueprint, request
from flask_cors import cross_origin
from flask_login import current_user, login_user, logout_user
from backend import db, bcrypt, limiter, verify_service
from backend.models import User
from backend.backend import Message
from werkzeug.utils import secure_filename
from backend.files.routes import upload_image, delete_image


users = Blueprint('users', __name__)


@users.route('/api/register', methods=['POST'])
@limiter.limit("10 per day")
@cross_origin()
def createUser():
    try:
        if current_user.is_authenticated:
            return Message.msg(f'{current_user.username} is currently authenticated'), 200
        userInfo = request.json
        if hasattr(userInfo, 'phone') and userInfo.get('phone') is not None:
            return login_with_phone(userInfo)
        elif userInfo.get('email') is not None and userInfo.get('password') is not None:
            return register_with_email_and_password(userInfo)
        else:
            return Message.error('Unable to register with these credentials'), 412

    except Exception as e:
        return Message.error(e), 400


def login_with_phone(phone):
    verify_service.verifications.create(to=phone, channel='sms')
    return Message.msg("A verification code has been sent")


def register_with_email_and_password(userInfo):
    if userInfo.get('secretCode') == os.getenv('SECRET_CODE'):
        hashed_password = bcrypt.generate_password_hash(
            userInfo.get('password')).decode('utf-8')
        user = User(username=userInfo.get('username'),
                    email=userInfo.get('email'), password=hashed_password)
        return add_user(user)
    else:
        return Message.error('Incorrect secret code'), 412


def add_user(user):
    db.session.add(user)
    db.session.commit()
    login_user(user)
    return Message.data("Your account has been created! Set your username under 'Account'",
                        current_user.serialize), 200


@users.route("/api/check_phone_code", methods=['POST'])
@limiter.limit("3 per minute")
@cross_origin()
def check_code():
    try:
        if current_user.is_authenticated:
            return Message.msg(f'{current_user.username} is currently authenticated'), 200
        userInfo = request.json

        phone = userInfo.get('phone')
        code = userInfo.get('code')
        if phone is None or code is None:
            return Message.error('Cannot verify code with these credentials'), 412

        result = verify_service.verification_checks.create(to=phone, code=code)
        if result.status != 'approved':
            return Message.error('Incorrect code'), 412

        user = User.query.filter_by(phone=phone).first()
        if user:
            login_user(user, remember=True)
            return Message.data('Login Successful!', current_user.serialize), 200
        else:
            user = User(phone=phone)
            return add_user(user)

    except Exception as e:
        return Message.error(e), 400


@users.route("/api/login", methods=['POST'])
@limiter.limit("3 per minute")
@cross_origin()
def login():
    try:
        if current_user.is_authenticated:
            return Message.msg(f'{current_user.username} is currently authenticated'), 200
        userInfo = request.json

        if userInfo.get('phone') is not None:
            return login_with_phone(userInfo)
        elif userInfo.get('email') is not None and userInfo.get('password') is not None:
            return login_with_email_and_password(userInfo)
        else:
            return Message.error('Unable to login with these credentials'), 412

    except Exception as e:
        return Message.error(e), 400


def login_with_email_and_password(userInfo):
    user = User.query.filter_by(email=userInfo.get('email')).first()
    if user and bcrypt.check_password_hash(user.password, userInfo.get('password')):
        login_user(user, remember=userInfo.get('remember'))
        return Message.data('Login Successful!', current_user.serialize), 200
    else:
        return Message.error('Login Unsuccessful'), 412


@users.route("/api/logout", methods=['POST'])
@limiter.limit("3 per minute")
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
@limiter.exempt
@cross_origin()
def getUser():
    try:
        if current_user.is_authenticated:
            return Message.data('', current_user.serialize), 200
        else:
            return Message.msg(''), 200
    except Exception as e:
        return Message.error(e), 400


@ users.route('/api/user/update', methods=['POST'])
@limiter.limit("3 per minute")
@ cross_origin()
def updateUser():
    if not current_user.is_authenticated:
        return Message.error('You must be logged in to update an account'), 412
    try:
        formData = request.form

        image = None
        try:
            image = request.files.get('image')
        except Exception as e:
            return Message.error(f'{e} (Could not get image from form)'), 400

        if image:
            response = upload_image(image)
            response_message = response[0].get_json()['message']
            if 'ERROR' in response_message:
                return response

            current_user.image_file = secure_filename(image.filename)

            response = delete_image(current_user.image_file)
            response_message = response[0].get_json()['message']
            if 'ERROR' in response_message:
                return response

        username = formData.get('username')
        if username:
            current_user.username = username

        email = formData.get('email')
        if email:
            current_user.email = email

        db.session.commit()
        return Message.msg('Your account has been updated!'), 200
    except Exception as e:
        return Message.error(e), 400
