#!/bin/bash
if ! pgrep -f selenium-server-4.1.2.jar > /dev/null
then
    echo "Starting Selenium Server"
    nohup java -jar selenium-server-4.1.2.jar standalone > /dev/null 2>&1 &
fi

./provengo.sh run --show Magento | awk '/switching to dry run/{exit} 1'