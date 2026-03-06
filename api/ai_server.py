"""Simple Flask-based server to serve predictions from the trained model."""

from flask import Flask, request, jsonify
import pickle
from pathlib import Path

app = Flask(__name__)
MODEL_PATH = Path(__file__).parent.parent / "models" / "risk_model.pkl"
model = None


def load_model():
    global model
    if model is None:
        if not MODEL_PATH.exists():
            raise FileNotFoundError(f"Model not found at {MODEL_PATH}")
        with open(MODEL_PATH, "rb") as f:
            model = pickle.load(f)
    return model


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    # Expect a list of feature values under the key "features"
    features = data.get("features")
    if features is None:
        return jsonify({"error": "'features' key missing"}), 400
    clf = load_model()
    prediction = clf.predict([features])
    return jsonify({"prediction": int(prediction[0])})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
