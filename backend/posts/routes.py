from flask import Blueprint, request
from flask_login import current_user
from flask_cors import cross_origin
from backend import db
from backend.models import Post
from backend.backend import Message
from datetime import datetime
from werkzeug.utils import secure_filename
from backend.files.routes import upload_image


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


@posts.route('/api/post/create', methods=['POST'])
@cross_origin()
def createPost():
    try:
        if not current_user.is_authenticated:
            return Message.error('Please log in before creating a post'), 412
        formData = request.form

        image = None
        try:
            image = request.files.get('image')
        except Exception as e:
            return Message.error(f'{e} (Could not get image from form)'), 400

        if image:
            error = upload_image(image)
            if error:
                return error
        else:
            return Message.error(f'No Image'), 400

        image_name = secure_filename(image.name)
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
        # Delete Image!!!!
        db.session.delete(post)
        db.session.commit()
        return Message.msg('Sucessfully deleted post!'), 200
    except Exception as e:
        return Message.error(e), 400
