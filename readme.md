www.openheartnerdery.co.uk
================================

Pre-Requisites
--------------------------------

Building the site requires the following software to be installed on the build computer:

* <a href="http://www.python.org/download/releases/2.7/">Python 2.7</a> (for Jekyll post compilation)
* Ruby 1.9.3 (for SASS compilation)
* <a href="http://nodejs.org/">NodeJS</a> Version 0.8.0+ (for Grunt)

Building
--------------------------------

Clone this repository into a directory of your choice.

Install <a href="https://npmjs.org/package/grunt-cli">Grunt CLI</a> globally:

```
npm install -g grunt-cli
```

Next, from the route of the directory where you cloned this repository, issue the following to install Node modules:

```
npm install
```

Finally, issue either:

```
grunt build
```

and move the files from the _/build_ directory to your public html folder of your webserver.

You can also see the juicy details if you build with a debug flag:

```
grunt build:debug
```
