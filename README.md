# Defense AI Training

This repository contains a simple pipeline for locally training a machine learning
model that will eventually be used as part of a defense‑related AI project.
The data collection process is still under way, so the code works with
placeholder data until real records are available.

## Project structure

```
defense-ai-training
│
├── database
│     defense_data.db          # SQLite database used for storage
│
├── datasets
│     export_training_data.py  # Helper to export data for training
│
├── models
│     risk_model.pkl           # Pickled trained classifier
│
├── training
│     train_model.py           # Train and save a model
│     evaluate_model.py        # Run evaluation metrics
│
├── api
│     ai_server.py             # Lightweight Flask prediction API
│
├── utils
│     db_connection.py         # Database connection helper
│
├── requirements.txt          # Python dependencies
└── README.md
```

## Getting started

Install dependencies:

```bash
pip install -r requirements.txt
```

### Training a model

Data will be exported from the database with:

```bash
python datasets/export_training_data.py --output ./training/training_data.csv
```

Once a dataset is available, train the model:

```bash
python training/train_model.py --data ./training/training_data.csv --output ./models/risk_model.pkl
```
> ⚠️ **Important**: if you change the set of feature columns (e.g. added or
> removed attributes) you **must rerun the training step** before evaluating
> or serving predictions. Models are sensitive to the number of features they
> were trained on.
### Evaluating the model

```bash
python training/evaluate_model.py --model ./models/risk_model.pkl --data ./training/eval_data.csv
```

### Running the API

Start the server and POST JSON payloads:

```bash
python api/ai_server.py
```

Request example:

```json
{ "features": [0.1, 0.5, -1.2, 3.4, 0.0] }
```

The response will contain a ``prediction`` field.

## Notes

- The current scripts generate synthetic data when real data is missing.
- Replace the placeholder logic with actual queries/processing once data is
  being collected.
- The model uses scikit-learn's ``RandomForestClassifier`` by default.

Happy training!
