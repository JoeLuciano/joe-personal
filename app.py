from flask import Flask
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder='build')
CORS(app)


@app.route('/api', methods=['GET'])
@cross_origin()
def index():
    return {
        'resultStatus': 'SUCCESS',
        'message': "Hello Api Handler"
    }


@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(debug=True)
