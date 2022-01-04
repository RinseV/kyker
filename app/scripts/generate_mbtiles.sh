#!/usr/bin/env bash

mkdir -p tmp/mbtiles/data

# Download the OSM data for South Africa
wget -O tmp/mbtiles/south-africa-latest.osm.pbf https://download.geofabrik.de/africa/south-africa-latest.osm.pbf

# Extract the bounding box for the Kruger National Park
# Alternatively: bin/osmosis -v --read-pbf ../south-africa-latest.osm.pbf --bounding-box left=30.753648 right=32.692252 top=-22.16947 bottom=-25.605811 completeWays=yes --write-pbf ../kruger-park.osm.pbf
docker run -v "$(pwd)/tmp/mbtiles":/osm-data yagajs/osmosis osmosis -v --read-pbf /osm-data/south-africa-latest.osm.pbf --bounding-box left=30.753648 right=32.692252 top=-22.16947 bottom=-25.605811 completeWays=yes --write-pbf /osm-data/kruger-park.osm.pbf

# Create the mbtiles
docker run -e JAVA_TOOL_OPTIONS="-Xmx1g" -v "$(pwd)/tmp/mbtiles/data":/data -v "$(pwd)/kruger-park.osm.pbf":/kruger-park.osm.pbf ghcr.io/onthegomap/planetiler:latest --osm-path=/kruger-park.osm.pbf --force --download

# Copy the output to the app assets
cp tmp/mbtiles/data/output.mbtiles assets/kruger.mbtiles
