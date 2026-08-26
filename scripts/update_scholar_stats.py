#!/usr/bin/env python3
import json
import os
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen

AUTHOR_ID = "YeBiFWYAAAAJ"
OUT = Path("assets/scholar-stats.json")


def metric_from_table(table, accepted_keys):
    accepted = {k.lower().replace("-", "_") for k in accepted_keys}
    for row in table:
        for key, value in row.items():
            normalized = str(key).lower().replace("-", "_")
            if normalized in accepted and isinstance(value, dict):
                all_value = value.get("all")
                if isinstance(all_value, (int, float)):
                    return int(all_value)
    return None


def main():
    api_key = os.environ.get("SERPAPI_KEY")
    if not api_key:
        raise SystemExit("SERPAPI_KEY is required")

    params = urlencode({
        "engine": "google_scholar_author",
        "author_id": AUTHOR_ID,
        "hl": "en",
        "api_key": api_key,
    })
    url = f"https://serpapi.com/search.json?{params}"
    request = Request(url, headers={"User-Agent": "ekriukov-site-scholar-updater/1.0"})
    with urlopen(request, timeout=45) as response:
        payload = json.load(response)

    if payload.get("error"):
        raise RuntimeError(payload["error"])

    table = payload.get("cited_by", {}).get("table", [])
    citations = metric_from_table(table, {"citations"})
    h_index = metric_from_table(table, {"h_index", "hindex", "indice_h"})

    if citations is None or h_index is None:
        raise RuntimeError("Could not locate Google Scholar citation or h-index metrics in the API response")

    result = {
        "citations": citations,
        "h_index": h_index,
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "source": "Google Scholar via SerpApi",
        "profile": f"https://scholar.google.com/citations?user={AUTHOR_ID}",
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
    print(f"Updated citations={citations}, h_index={h_index}")


if __name__ == "__main__":
    main()
