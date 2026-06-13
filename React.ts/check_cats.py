import csv, json, re

ts_cats = set()
with open('E:/Cursor_Workspace/EXAMPLE/restaurant-app/React.ts/src/data/menuData.ts', encoding='utf-8') as f:
    for line in f:
        line = line.strip()
        if line.startswith('[') and '"' in line:
            parts = line.split('","')
            if len(parts) >= 2:
                cat = parts[1].strip('["')
                ts_cats.add(cat)

csv_cats = set()
with open('E:/Cursor_Workspace/EXAMPLE/restaurant-app/React.ts/public/data/menu.csv', encoding='utf-8-sig') as f:
    reader = csv.reader(f)
    next(reader)
    for row in reader:
        csv_cats.add(row[1])

print("=== CSV categories ===")
for c in sorted(csv_cats):
    print(f"  '{c}'")
print(f"Count: {len(csv_cats)}")

print("\n=== TS categories ===")
for c in sorted(ts_cats):
    print(f"  '{c}'")
print(f"Count: {len(ts_cats)}")

print("\n=== Missing from TS ===")
for c in sorted(csv_cats - ts_cats):
    print(f"  '{c}'")

print("\n=== Extra in TS ===")
for c in sorted(ts_cats - csv_cats):
    print(f"  '{c}'")
