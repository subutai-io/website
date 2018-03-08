#!/bin/bash

for html in `find . -type f -regex '.*\.html'`; do
  cat "$html" | sed -e 's@internal-pages/@@' > "$html.tmp"
  rm "$html"; mv "$html.tmp" "$html"
done
