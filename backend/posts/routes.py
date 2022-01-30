from flask import Blueprint, jsonify, request
from flask_login import current_user
from flask_cors import cross_origin
from backend import db
from backend.models import Post
from backend.backend import Message
from datetime import datetime

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
        postInfo = request.json
        post = Post(title=postInfo.get('title'), date_posted=datetime.utcnow(),
                    content=postInfo.get('content'), author=current_user)
        db.session.add(post)
        db.session.commit()
        return Message.msg('Sucessfully created post!'), 200
    except Exception as e:
        return Message.error(e), 400


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
