from flask import Blueprint, jsonify, request
from flask_login import current_user
from flask_cors import cross_origin
from backend import db
from backend.models import Post
from datetime import datetime

posts = Blueprint('posts', __name__)


@posts.route('/api/posts', methods=['GET'])
@cross_origin()
def getPosts():
    title = request.args.get('title')
    try:
        if title:
            post = Post.query.filter_by(title=title).first()
            return jsonify(post.to_dict()), 200
        else:
            all_posts = [doc.to_dict() for doc in Post.query.all()]
            return jsonify(all_posts), 200
    except Exception as e:
        return f"An Error Occured: {e}"


@posts.route('/api/posts/create', methods=['POST'])
@cross_origin()
def getPosts():
    if not current_user.is_authenticated:
        return jsonify({'message': 'Please log in before creating a post'}), 200
    postInfo = request.json
    try:
        post = Post(title=postInfo.get('title'), date_posted=datetime.utcnow(),
                    content=postInfo.get('content'), author=current_user)
        db.session.add(post)
        db.session.commit()
        return jsonify({'message': 'Sucessfully created post!'}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


@posts.route('/api/posts/remove', methods=['POST'])
@cross_origin()
def removePost():
    document = request.json.get('title')
    print(document)
    try:
        pass  # ADD IN SQLALCHEMY
        # if document:
        #     result = posts_ref.delete(document)
        #     print(result)
        #     return jsonify(result), 200
    except Exception as e:
        return f"An Error Occured: {e}"
    return 'Nothing happened', 200
