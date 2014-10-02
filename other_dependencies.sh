#!bin/bash

if  [ ! -d "public/stylesheets/bower_components" ]; then
  cd public/stylesheets/
  bower install Polymer/core-animation
  bower install Polymer/paper-dialog
  bower install Polymer/paper-input
  bower install Polymer/paper-button
  echo "Installed required bower components"
fi

