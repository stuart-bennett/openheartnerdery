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

Finally, issue the command:

```
grunt build
```

and move the files from the _/build_ directory to your public html folder of your webserver.

You can also see the juicy details if you build with a debug flag:

```
grunt build:debug
```

Troubleshooting
--------------------------------

If you're on Windows and you receive the following message when trying to build:

```
Warning: Command failed:   Liquid Exception: incompatible character encodings: UTF-8 and CP850 in resume.html
```

...you'll may need to issue the following command prior to building

```
chcp 65001
```

By default, Windows 7 uses *Multilingual (Latin I)* as it's Code Page. This will trip up Jekyll as it tries to compile the resume page with contains fancy characters. The preceeding command will make the command prompt use a code page compatible with UTF-8 (which contains the fancy characters). The code page will only remain changed for the life time of the single command prompt session.