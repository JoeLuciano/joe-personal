from flask import Blueprint, request, send_file
from flask_login import current_user
from flask_cors import cross_origin
from backend import s3, limiter
from backend.backend import Message, get_aws_and_sql_compatible_file_name
import os
from werkzeug.utils import secure_filename


files = Blueprint('files', __name__)


IMAGE_BUCKET = os.environ.get('AWS_IMAGES_BUCKET_NAME')


@files.route('/api/image/upload', methods=['POST'])
@limiter.limit("30 per hour")
@cross_origin()
def upload_image_endpoint():
    if not current_user.is_authenticated:
        return Message.error('You must be logged in to do this'), 412
    try:
        image = request.files.get('image')
    except Exception as e:
        return Message.error(f'{e} (Could not get image from form)'), 400

    return upload_image(image)


def upload_image(image):
    if image:
        image_name = get_aws_and_sql_compatible_file_name(image.filename)

        if does_image_exist(image_name):
            return Message.error(f'Image already exists on AWS'), 400
        try:
            s3.upload_fileobj(image, IMAGE_BUCKET, image_name,
                              ExtraArgs={"ContentType": image.content_type})
        except Exception as e:
            return Message.error(f'{e} (Could not upload image to AWS)'), 400
    else:
        return Message.error(f'No Image in request'), 400

    image_name = secure_filename(image.name)
    return Message.msg(f'Sucessfully uploaded {image_name}!'), 200


@files.route('/api/image/get/<string:image_name>', methods=['GET'])
@limiter.limit("2 per second")
@cross_origin()
def get_image_endpoint(image_name):
    if not current_user.is_authenticated:
        return Message.error('You must be logged in to do this'), 412
    return get_image(image_name)


def get_image(image_name):
    image_name = secure_filename(image_name)
    if not does_image_exist(image_name):
        return Message.error(f'{image_name} does not exist on AWS'), 400
    try:
        image = s3.get_object(Bucket=IMAGE_BUCKET, Key=image_name)
        return send_file(image['Body'], mimetype=image['ContentType'])
    except Exception as e:
        return Message.error(f'{e} (Could not get image from AWS)'), 400


@files.route('/api/image/delete/<string:image_name>', methods=['POST'])
@limiter.limit("120 per hour")
@cross_origin()
def delete_image_endpoint(image_name):
    if not current_user.is_authenticated:
        return Message.error('You must be logged in to do this'), 412
    return delete_image(image_name)


def delete_image(image_name):
    image_name = secure_filename(image_name)
    if not does_image_exist(image_name):
        return Message.error(f'Image does not exist on AWS'), 400
    try:
        s3.delete_object(Bucket=IMAGE_BUCKET, Key=image_name)
        return Message.msg(f'Sucessfully deleted {image_name}!'), 200
    except Exception as e:
        return Message.error(f'{e} (Could not delete image from AWS)'), 400


def does_image_exist(image_name):
    try:
        s3.head_object(Bucket=IMAGE_BUCKET, Key=image_name)
        return True
    except:
        return False
