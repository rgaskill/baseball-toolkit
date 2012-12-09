Dependencies
------------
Install the client dependencies.

    cd bbtk-client
    npm install

[Grunt](https://github.com/gruntjs/grunt/tree/devel)
-----

    npm install -g grunt-cli

[Google AppEngine](https://developers.google.com/appengine/)
------------------

Maven commands

    mvn gae:run     #run local instance
    mvn gae:deploy  #deploy to gae

By default the client js will be concatinated and minified. If you don't want to concat and minify the js use the dev profile.

    mvn gae:run -Pdev     #run local instance
    mvn gae:deploy -Pdev  #deploy to gae