from flask import Blueprint, render_template, request, current_app, jsonify
from keras.utils import load_img, img_to_array
from keras.models import load_model
from keras.applications.vgg16 import preprocess_input
from io import BytesIO
import numpy as np
import os

LoadModel = Blueprint('loadmodel', __name__)


@LoadModel.route('/')
def classification():
    return render_template('classification.html')


@LoadModel.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        image_file = request.files['image']
        if image_file:
            image_path = os.path.join(
                current_app.config['UPLOAD_FOLDER'], image_file.filename)
            image_file.save(image_path)

            img = load_img(image_path, target_size=(224, 224))

            # img_bytes = image_file.read()  # Read the file content as bytes

            # img = load_img(BytesIO(img_bytes), target_size=(
            #     224, 224))  # Load image from bytes

            img_array = img_to_array(img)
            img_array = np.expand_dims(img_array, axis=0)
            img_array = preprocess_input(img_array)

            model_path = os.path.join(current_app.root_path, 'model.h5')
            model = load_model(model_path)

            preds = model.predict(img_array)
            predicted_class = np.argmax(preds[0])

            def numbers_to_string(argument):
                switcher = {
                    7: "Rooster",
                    8: "Hen",
                    9: "Ostrich",
                    10: "Brambling",
                    11: "Goldfinch",
                    12: "House finch",
                    13: "Junco",
                    14: "Indigo bunting",
                    15: "Robin",
                    16: "Bulbul",
                    17: "Jay",
                    18: "Magpie",
                    19: "Chickadee",
                    20: "Water Ouzel",
                    22: "Bald Eagle",
                    23: "Vulture",
                    24: "Great Grey Owl",
                    80: "Black Grouse",
                    81: "Ptarmigan",
                    82: "Ruffed Grouse",
                    83: "Prairie Chicken",
                    84: "Peacock",
                    85: "Quail",
                    86: "Partidge",
                    87: "African Grey",
                    88: "Macaw",
                    89: "Sulphur-Crested Cockatoo",
                    90: "Loriket",
                    91: "Coucal",
                    92: "Bee Eater",
                    93: "Hornbill",
                    94: "Hummingbird",
                    95: "Jacamar",
                    96: "Toucan",
                    97: "Drake",
                    98: "Red-Breasted Merganser",
                    99: "Goose",
                    100: "Black Swan",
                    127: "White Stork",
                    128: "Black Stork",
                    129: "Spoonbill",
                    130: "Flamingo",
                    131: "Little Blue Heron",
                    132: "American Egret",
                    133: "Bittern",
                    135: "Limpkin",
                    136: "American Gallinule",
                    137: "American Coot",
                    138: "Bustard",
                    139: "Ruddy Turnstone",
                    140: "Red-Backed Sandpiper",
                    141: "Redshank",
                    142: "Dowitcher",
                    143: "Oystercatcher",
                    144: "Pelican",
                    145: "King Penguin",
                    146: "Albatros"
                }
                return switcher.get(argument, "Nothing")
            class_name = numbers_to_string(predicted_class)
            # return render_template('result.html', image_path=image_path, predicted_class=predicted_class, class_name=class_name)
            return jsonify(classname=class_name), 200
