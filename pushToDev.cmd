@echo off
start cmd /k "cd ../.. && cd .. && cd new-mini-h5 && git checkout develop&& git add -A&&git commit -m "1" && git push && cd .. && cd work\myorange && git add -A && git commit -m "1" && git push origin master"


