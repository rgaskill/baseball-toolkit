

[Google AppEngine](https://developers.google.com/appengine/)
------------------
First update bbtk-server/src/main/webapp/WEB-INF/appengine-web.xml to your app engine application.

    cd bbtk-server
    mvn clean install
    cd target
    appcfg.sh --oauth2 update bb-toolkit