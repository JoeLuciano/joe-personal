from flask import Blueprint, jsonify, request
from flask_login import current_user
from flask_cors import cross_origin
from backend import db
from backend.models import Post
from datetime import datetime

posts = Blueprint('posts', __name__)


@posts.route('/api/post/<string:title>', methods=['GET'])
@cross_origin()
def getPost(title):
    try:
        if title:
            post = Post.query.filter_by(title=title).first()
            return jsonify({'message': '', 'payload': post.serialize}), 200
        else:
            return jsonify({'message': 'Please specify a post to view'}), 200
    except Exception as e:
        return jsonify(f"An Error Occured: {e}"), 400


@posts.route('/api/allposts', methods=['GET'])
@cross_origin()
def getPosts():
    try:
        all_posts = [post.serialize for post in Post.query.all()]
        return jsonify({'message': '', 'payload': all_posts}), 200
    except Exception as e:
        return jsonify(f"An Error Occured: {e}"), 400


@posts.route('/api/post/create', methods=['POST'])
@cross_origin()
def createPost():
    if not current_user.is_authenticated:
        return jsonify({'message': 'Please log in before creating a post'}), 412
    postInfo = request.json
    try:
        post = Post(title=postInfo.get('title'), date_posted=datetime.utcnow(),
                    content=postInfo.get('content'), author=current_user)
        db.session.add(post)
        db.session.commit()
        return jsonify({'message': 'Sucessfully created post!'}), 200
    except Exception as e:
        return jsonify({'message': f"An Error Occured: {e}"}), 400


@posts.route('/api/post/delete', methods=['POST'])
@cross_origin()
def removePost():
    if not current_user.is_authenticated:
        return jsonify({'message': 'You must be logged in to delete a post'}), 412
    title = request.json.get('title')
    try:
        post = Post.query.filter_by(title=title).first()
        db.session.delete(post)
        db.session.commit()
        return jsonify({'message': 'Sucessfully deleted post!'}), 200
    except Exception as e:
        return jsonify(f"An Error Occured: {e}"), 400
