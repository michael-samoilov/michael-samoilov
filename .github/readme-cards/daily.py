import json
import subprocess
import sys
from collections import Counter
from datetime import date, timedelta

repos = sys.argv[1:]
if not repos:
    sys.exit("usage: python3 daily.py <clone> [<clone> ...]")

counts = Counter()
for repo in repos:
    dates = subprocess.run(
        ["git", "-C", repo, "log", "--format=%ad", "--date=short", "HEAD"],
        check=True, capture_output=True, text=True,
    ).stdout.split()
    counts.update(dates)

start = date.fromisoformat(min(counts))
end = date.fromisoformat(max(counts))
days = [counts.get((start + timedelta(n)).isoformat(), 0) for n in range((end - start).days + 1)]
json.dump({"start": start.isoformat(), "end": end.isoformat(), "counts": days}, open("daily.json", "w"))
print(f"{len(days)} days, {sum(days)} commits, {start} to {end}")
