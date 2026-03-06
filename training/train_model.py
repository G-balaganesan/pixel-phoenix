"""Train a machine learning model using locally collected data.

The data is expected to be available as a CSV file or similar. Because the
collection process is ongoing the script currently trains on placeholder
data if none is provided. Replace the placeholder generation with your
actual dataset once it becomes available.

Usage:
    python train_model.py --data data.csv --output ../models/risk_model.pkl
"""

import argparse
import pickle
from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split


def load_data(path: Path):
    # handles missing file by generating synthetic data matching user-specified ranges
    if not path.exists():
        print("Warning: data file not found, using synthetic placeholder data")
        # create dummy dataset with 9 features and a categorical label
        n = 100
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

    # features are all columns except the label
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
    # encode string labels into integers
    from sklearn.preprocessing import LabelEncoder

    le = LabelEncoder()
    y = le.fit_transform(df["risk_level"].values)
    return X, y


def train_and_save(data_path: Path, model_path: Path):
    X, y = load_data(data_path)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X_train, y_train)

    print(f"Training accuracy: {clf.score(X_train, y_train):.3f}")
    print(f"Validation accuracy: {clf.score(X_test, y_test):.3f}")

    model_path.parent.mkdir(parents=True, exist_ok=True)
    with open(model_path, "wb") as f:
        pickle.dump(clf, f)
    print(f"Saved trained model to {model_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Train risk model locally")
    parser.add_argument(
        "--data",
        type=Path,
        default=Path("./training_data.csv"),
        help="Path to training data CSV",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("../models/risk_model.pkl"),
        help="Where to write the trained model",
    )
    args = parser.parse_args()

    train_and_save(args.data, args.output)
