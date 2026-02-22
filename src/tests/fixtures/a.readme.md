for f in ./*.txt; do
  val=$(sed -n '10p' "$f" | awk -F';' '{print $NF}')
  if [[ "$val" == *Omitted* ]]; then
    val=$(sed -n '12p' "$f" | awk -F';' '{print $NF}')
  fi
  echo "$val"
done