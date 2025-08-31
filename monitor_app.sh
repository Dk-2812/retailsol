LOG_FILE="health_check.log"
URL="http://localhost:5000/health"

while true; do
  TIMESTAMP=$(date)
  RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $URL)

  if [ "$RESPONSE" == "200" ]; then
    echo "$TIMESTAMP: Backend healthy" >> $LOG_FILE
  else
    echo "$TIMESTAMP: Backend unhealthy (HTTP $RESPONSE)" >> $LOG_FILE
  fi

  sleep 300
done
