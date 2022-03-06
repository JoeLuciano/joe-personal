from flask import Blueprint, request
from flask_login import current_user
from flask_cors import cross_origin
from backend import db
from backend.models import Post
from backend.backend import Message, get_aws_and_sql_compatible_file_name
from datetime import datetime
from werkzeug.utils import secure_filename
from backend.files.routes import upload_image, delete_image


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
    if not current_user.is_authenticated:
        return Message.error('Please log in before creating a post'), 412
    try:
        formData = request.form

        image = None
        try:
            image = request.files.get('image')
        except Exception as e:
            return Message.error(f'{e} (Could not get image from form)'), 400

        post = Post(title=formData.get('title'), date_posted=datetime.utcnow(),
                    content=formData.get('content'), author=current_user,
                    image_file=get_aws_and_sql_compatible_file_name(image.filename))

        db.session.add(post)
        db.session.commit()

        if image:
            response = upload_image(image)
            response_message = response[0].get_json()['message']
            if 'ERROR' in response_message:
                return response
        else:
            return Message.error(f'No image uploaded for post'), 400

        return Message.msg(f'Sucessfully created post!'), 200
    except Exception as e:
        return Message.error(f'Unexpected {e}'), 400


@posts.route('/api/post/delete', methods=['POST'])
@cross_origin()
def removePost():
    if not current_user.is_authenticated:
        return Message.error('You must be logged in to delete a post'), 412
    try:
        title = request.json.get('title')
        post = Post.query.filter_by(title=title).first()
        print(post.image_file)
        response = delete_image(post.image_file)
        response_message = response[0].get_json()['message']
        if 'ERROR' in response_message:
            return response

        db.session.delete(post)
        db.session.commit()
        return Message.msg('Sucessfully deleted post!'), 200
    except Exception as e:
        return Message.error(e), 400
