# Test app for Memsource

App will be launched at port 3001. User log-in logs can be found in logs/debug.log 

## Requirements

    yarn
    node 7.7.4

## Install app

    $ git clone git@github.com:CorwinCZ/memsource.git
    $ cd memsource
    $ yarn install
    $ cd frontend && yarn install

## Run app

    $ cd <app root> 
    $ yarn run-all

## Logs
    $ ./node_modules/bunyan/bin/bunyan logs/debug.log