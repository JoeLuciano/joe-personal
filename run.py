from backend import create_app
from backend.backend import Message
from flask import send_from_directory

app = create_app()


@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run()
