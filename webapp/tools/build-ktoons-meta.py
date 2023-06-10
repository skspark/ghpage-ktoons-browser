import os
import json

directory = "public/datas/k-toons"
meta_filename = "public/datas/k-toons-meta.json"

# Get a list of JSON filenames in the directory
json_files = [file for file in os.listdir(directory) if file.endswith(".json")]

# Create a dictionary with the filenames
data = {
    "files": json_files
}

# Save the dictionary to the meta file
with open(meta_filename, "w") as meta_file:
    json.dump(data, meta_file, indent=4)

print("Filenames saved to", meta_filename)