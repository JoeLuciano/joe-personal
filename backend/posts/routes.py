from flask import Blueprint, jsonify, request
from flask_login import current_user
from flask_cors import cross_origin
from backend import db, s3
from backend.models import Post
from backend.backend import Message
from datetime import datetime
import os
import boto3
from werkzeug.utils import secure_filename


posts = Blueprint('posts', __name__)


@posts.route('/api/post/<string:title>', methods=['GET'])
@cross_origin()
def getPost(title):
    try:
        if title:
            post = Post.query.filter_by(title=title).first()
            return Message.data('', post.serialize), 200
        else:
            return Message.msg('Please specify a post to view'), 200
    except Exception as e:
        return Message.error(e), 400


@posts.route('/api/allposts', methods=['GET'])
@cross_origin()
def getPosts():
    try:
        all_posts = [post.serialize for post in Post.query.all()]
        return Message.data('', all_posts), 200
    except Exception as e:
        return Message.error(e), 400


UPLOAD_FOLDER = "post-images"
BUCKET = "joe-personal-storage"


@posts.route('/api/post/create', methods=['POST'])
@cross_origin()
def createPost():
    try:
        if not current_user.is_authenticated:
            return Message.error('Please log in before creating a post'), 412
        formData = request.form

        image = None
        image_name = None
        try:
            image = request.files.get('picture')
            print(image)
        except Exception as e:
            return Message.error(f'{e} (Could not get image from form)'), 400

        if image:
            image_name = secure_filename(image.name)
            bucket_name = os.environ.get('AWS_STORAGE_BUCKET_NAME')
            try:
                s3.upload_fileobj(image, bucket_name, image_name)
            except Exception as e:
                return Message.error(f'{e} (Could not upload image to AWS)'), 400
        else:
            return Message.error(f'No Image'), 400

        post = Post(title=formData.get('title'), date_posted=datetime.utcnow(),
                    content=formData.get('content'), author=current_user, image_file=image_name)
        db.session.add(post)
        db.session.commit()
        return Message.msg(f'Sucessfully created {image_name} post!'), 200
    except Exception as e:
        return Message.error(f'{e}'), 400


@posts.route('/api/post/delete', methods=['POST'])
@cross_origin()
def removePost():
    try:
        if not current_user.is_authenticated:
            return Message.error('You must be logged in to delete a post'), 412
        title = request.json.get('title')
        post = Post.query.filter_by(title=title).first()
        db.session.delete(post)
        db.session.commit()
        return Message.msg('Sucessfully deleted post!'), 200
    except Exception as e:
        return Message.error(e), 400
