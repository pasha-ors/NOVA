from flask import Flask
from api.routes import api_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.register_blueprint(api_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)