#!/bin/bash
if type -p java; then
    _java=java
elif [[ -n "$JAVA_HOME" ]] && [[ -x "$JAVA_HOME/bin/java" ]];  then
    _java="$JAVA_HOME/bin/java"
else
    echo "Sorry, Java not found."
    echo "Provengo requires Java, version 11 ot higher."
    echo "Please install java, and make sure it's available via the PATH or JAVA_HOME environment variables."
    exit -1
fi

if [[ "$_java" ]]; then
    HERE=$(dirname $0)
    UBER_JAR=$HERE/Provengo.uber.jar
    $_java -jar $UBER_JAR "$@"
fi
