from flask import jsonify
from werkzeug.utils import secure_filename

MAX_IMAGE_NAME_LENGTH = 20


def get_aws_and_sql_compatible_file_name(file_name):
    compatible_filename = secure_filename(file_name)
    if len(compatible_filename) > MAX_IMAGE_NAME_LENGTH:
        file_name_sections = compatible_filename.split('.')
        file_extension = file_name_sections[-1]
        shortened_file_name = file_name_sections[0][0:15]
        compatible_filename = '.'.join([shortened_file_name, file_extension])
    return compatible_filename


class Message:
    def msg(message):
        json_dict = {'message': message}
        return jsonify(json_dict)

    def data(message, data):
        json_dict = {'message': message, 'payload': data}
        return jsonify(json_dict)

    def error(message):
        json_dict = {'message': f'ERROR: {message}'}
        return jsonify(json_dict)
