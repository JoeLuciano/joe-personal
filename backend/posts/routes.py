from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from backend.models import Post

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


# @posts.route('/api/create', methods=['POST'])
# @cross_origin()
# def getPosts():
#     pass
    # title = request.json['title']
    # body = request.json['body']
    # try:
    #     if title:
    #         post = Post.query.filter_by(title=title).first()
    #         return jsonify(post.to_dict()), 200
    #     else:
    #         all_posts = [doc.to_dict() for doc in posts_ref.stream()]
    #         return jsonify(all_posts), 200
    # except Exception as e:
    #     return f"An Error Occured: {e}"


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
