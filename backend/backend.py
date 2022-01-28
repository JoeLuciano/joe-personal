from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from backend.models import Post

backend = Blueprint('backend', __name__)
