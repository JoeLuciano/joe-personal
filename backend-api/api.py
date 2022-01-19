from flask import Flask, jsonify
from flask_cors import CORS  # comment this on deployment

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET'])
def index():
    return {
        'resultStatus': 'SUCCESS',
        'message': "Hello Api Handler"
    }


if __name__ == '__main__':
    app.run(debug=True)
