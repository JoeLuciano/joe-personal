import os
from pydoc import doc
from flask import Flask, jsonify, request, flash, redirect, url_for, render_template
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder='./build', static_url_path='')
app.secret_key = os.getenv('SECRET_KEY')
CORS(app)


# CATCH ALL
@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/api/register', methods=['POST'])
@cross_origin()
def createUser():
    userInfo = request.json
    if userInfo.get('secretCode') == os.getenv('SECRET_CODE'):
        try:
            pass  # ADD IN SQLALCHEMY
        except Exception as err:
            print(f'FAILED USER CREATION: {err}')
            return jsonify(f'ERROR: {err}'), 406
        print('NEW USER CREATED')
        return jsonify('Your account has been created! You are now able to log in'), 200
    else:
        print('ERROR: User attempted to input incorrect secret code')
        return jsonify('ERROR: Incorrect secret code'), 412


@app.route('/api/posts', methods=['GET'])
@cross_origin()
def getPosts():
    document = request.args.get('title')
    try:
        pass  # ADD IN SQLALCHEMY
        # if document:
        #     post = posts_ref.document(document).get()
        #     return jsonify(post.to_dict()), 200
        # else:
        #     all_posts = [doc.to_dict() for doc in posts_ref.stream()]
        #     return jsonify(all_posts), 200
    except Exception as e:
        return f"An Error Occured: {e}"


@app.route('/api/posts/remove', methods=['POST'])
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


@app.route('/api/user', methods=['GET'])
@cross_origin()
def getUser():
    pass  # ADD IN SQLALCHEMY
    # print(CURRENT_USER)
    # if CURRENT_USER:
    #     return jsonify(CURRENT_USER), 200
    # else:
    #     return jsonify('No current user'), 200


if __name__ == '__main__':
    app.run()
