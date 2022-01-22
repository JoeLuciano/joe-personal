import firebase_admin
from firebase_admin import credentials, firestore, initialize_app
from flask import Flask, jsonify, request
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder='./build', static_url_path='')
CORS(app)

cred = credentials.Certificate(r'C:\Users\jlspi\Downloads\key.json')
default_app = initialize_app(cred)
db = firestore.client()


@app.route('/api', methods=['GET'])
@cross_origin()
def index():
    return {
        'resultStatus': 'SUCCESS',
        'message': "Hello Api Handler"
    }


todo_ref = db.collection(u'todos')


@app.route('/api/todolist/<string:document>', methods=['GET'])
def read(document):
    try:
        # Check if ID was passed to URL query
        if document:
            todo = todo_ref.document(document).get()
            return jsonify(todo.to_dict()), 200
        else:
            all_todos = [doc.to_dict() for doc in todo_ref.stream()]
            return jsonify(all_todos), 200
    except Exception as e:
        return f"An Error Occured: {e}"


posts_ref = db.collection(u'posts')


@app.route('/api/posts/', methods=['GET'])
@app.route('/api/posts/<string:document>', methods=['GET'])
def getPosts(document=None):
    try:
        # Check if ID was passed to URL query
        if document:
            post = posts_ref.document(document).get()
            return jsonify(post.to_dict()), 200
        else:
            all_posts = [doc.to_dict() for doc in posts_ref.stream()]
            return jsonify(all_posts), 200
    except Exception as e:
        return f"An Error Occured: {e}"


@app.route('/')
@app.route('/home')
@app.route('/posts')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run()
