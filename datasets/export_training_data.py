"""Utility to export training data from the database to a CSV file.

This script is a placeholder. The database schema and data collection
process are still under development, so it currently generates an empty
CSV with the expected columns. Replace the stub code with logic that
queries whatever storage you have and writes the records to disk.
"""

import argparse
import csv
from pathlib import Path


def export_data(output_path: Path):
    # generate placeholder data with realistic ranges described by user
    headers = [
        "signal_strength",
        "movement_speed",
        "encryption_match",
        "unidentified_object",
        "border_distance",
        "location_risk",
        "time_of_day",
        "previous_incident",
        "risk_level",
    ]
    import random

    with output_path.open("w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(headers)
        # write a few synthetic rows for illustration
        for _ in range(20):
            row = [
                random.randint(20, 100),               # signal_strength
                round(random.uniform(0, 300), 2),      # movement_speed
                random.choice([0, 1]),                  # encryption_match
                random.choice([0, 1]),                  # unidentified_object
                round(random.uniform(0, 500), 2),      # border_distance
                random.choice([1, 2, 3]),               # location_risk
                random.choice([0, 1, 2]),               # time_of_day
                random.choice([0, 1]),                  # previous_incident
                random.choice(["Low", "Medium", "High"]),
            ]
            writer.writerow(row)
    print(f"Created placeholder file with realistic header at {output_path}.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Export training data to CSV"
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("./training_data.csv"),
        help="Destination path for exported CSV",
    )

    args = parser.parse_args()

    export_data(args.output)
