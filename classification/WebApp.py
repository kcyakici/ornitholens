from flask import Flask, Blueprint, render_template

app = Flask(__name__)

from LoadModel import LoadModel
app.register_blueprint(LoadModel)

app.config['UPLOAD_FOLDER'] = 'static'

@app.route("/")
def index():
    return render_template('clasification.html')

if __name__ == '__main__':
    app.run(port=5000, debug=True)

