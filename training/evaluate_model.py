"""Evaluate a previously saved model against fresh data.

This script loads a model produced by ``train_model.py`` and runs simple
metrics on an evaluation dataset. If the evaluation data is missing a
placeholder dataset is used instead.

Usage:
    python evaluate_model.py --model ../models/risk_model.pkl --data eval.csv
"""

import argparse
import pickle
from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.metrics import classification_report


def load_data(path: Path):
    if not path.exists():
        print("Warning: evaluation file not found, using synthetic data")
        n = 50
        df = pd.DataFrame({
            "signal_strength": np.random.randint(20, 101, size=n),
            "movement_speed": np.random.uniform(0, 300, size=n),
            "encryption_match": np.random.choice([0, 1], size=n),
            "unidentified_object": np.random.choice([0, 1], size=n),
            "border_distance": np.random.uniform(0, 500, size=n),
            "location_risk": np.random.choice([1, 2, 3], size=n),
            "time_of_day": np.random.choice([0, 1, 2], size=n),
            "previous_incident": np.random.choice([0, 1], size=n),
            "risk_level": np.random.choice(["Low", "Medium", "High"], size=n),
        })
    else:
        df = pd.read_csv(path)

    feature_cols = [
        "signal_strength",
        "movement_speed",
        "encryption_match",
        "unidentified_object",
        "border_distance",
        "location_risk",
        "time_of_day",
        "previous_incident",
    ]
    X = df[feature_cols].values
    from sklearn.preprocessing import LabelEncoder

    le = LabelEncoder()
    y = le.fit_transform(df["risk_level"].values)
    return X, y


def load_model(path: Path):
    with open(path, "rb") as f:
        return pickle.load(f)


def evaluate(model_path: Path, data_path: Path):
    clf = load_model(model_path)
    X, y = load_data(data_path)
    try:
        y_pred = clf.predict(X)
    except ValueError as exc:
        # often caused by mismatched feature dimensionality
        print(f"Error during prediction: {exc}")
        print("The saved model may have been trained on a different schema.\n" \
              "Please retrain the model using `train_model.py` with the current data.")
        return
    print(classification_report(y, y_pred))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Evaluate risk model")
    parser.add_argument(
        "--model",
        type=Path,
        default=Path("../models/risk_model.pkl"),
        help="Path to the trained model",
    )
    parser.add_argument(
        "--data",
        type=Path,
        default=Path("./eval_data.csv"),
        help="Evaluation dataset",
    )
    args = parser.parse_args()

    evaluate(args.model, args.data)
