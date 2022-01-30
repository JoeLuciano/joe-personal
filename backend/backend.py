from flask import jsonify


class Message:
    def msg(message):
        json_dict = {'message': message}
        return jsonify(json_dict)

    def data(message, data):
        json_dict = {'message': message, 'payload': str(data)}
        return jsonify(json_dict)

    def error(message):
        json_dict = {'message': f'ERROR: {message}'}
        return jsonify(json_dict)
