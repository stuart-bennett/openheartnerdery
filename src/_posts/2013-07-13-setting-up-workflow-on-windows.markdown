---
layout: post
title:  Establishing a modern web development workflow on Windows
subtitle:  Setting up Grunt, Compass & Jekyll on Windows 7 (64 bit)
date:   2013-07-10 20:26:41
categories: jekyll compass grunt build automation
---

Whilst I run and use Fedora, I spend a lot of time in Windows (by day I'm a .NET developer). If I have a spark of inspiration or a quick kick of motivation to fix / amend my site whilst playing Civ V, I want to be ready and able to jump straight on it. I run Windows 7, 64 Bit and I found installing and configuring the same workflow used on Linux generally a painless process.

For total clarity I'm running Ruby 1.9.3, I plan to upgrade to version 2 soon but this post covers 1.9.3 so any inconsistences may be down to this.

####1. Install Ruby & the Ruby Development Kit
Go here <a href="http://rubyinstaller.org/downloads/" class="external-resource">http://rubyinstaller.org/downloads/</a> and pick a version of Ruby (I'm using 1.9.3 in this post) from the "RubyInstallers" section. Once downloaded, (leave the downloads page open, you'll be coming back!) run the installer - it's a really straight forward installation.

While you are here, grab the latest file that looks something like DevKit-tdm-x-x.x.x-xxxxxxx-xxxx-sfx.exe from the "Other Useful Downloads" -> "Development Kit" section. Run this DevKit file and specify a location where you want the files to be extracted to. By default it'll extract to the directory where the file was executed from, I changed mine to a more specific C:\programs\rubydevkit.

Open a command prompt and do the following:

{% highlight bat %}
C:\programs\rubydevkit\dk.rb init
C:\programs\rubydevkit\dk.rb install
{% endhighlight %}

This will install the necessary executables that ultimately make it possible for your environment to build native C/C++ extensions for Ruby - something we'll need in the following steps.

This completes the installation of Ruby. You could happily go off and do some ruby stuff now like getting started with Rails.

####2. Install Compass & Jekyll

This is really straight forward. Open Command Prompt and issue the following (let's assume my base directory for this project is C:\site):

{% highlight bat %}
cd C:\site
gem install compass
gem install jekyll
{% endhighlight %}

This will make the <em>compass</em> and <em>jekyll</em> commands available to you. You can confirm this:

{% highlight bat %}
compass --version
jekyll --version
{% endhighlight %}

If you were starting afresh with no existing code you should be issuing the "compass create .\" and "jekyll new yoursite" commands to kick off your project and generate the framework files. For me, I have existing code with existing compass and jekyll configs and code so I don't need to do this.

With your jekyll code in place, issue the following command (it will produce a deployable Jekyll site in a subdirectory, /_site, of your current location:

{% highlight bat %}
jekyll build
{% endhighlight %}

If you find that Jekyll outputs a warning along the lines of...

	[your ruby build path]/spawn.rb:162: warning: cannot close fd before spawn
	Liquid Exception: No such file or directory [reference to a jekyll post]
	
...then you'll also probably notice that your files have been generated but are empty! Sure enough <a href="http://stackoverflow.com/questions/17364028/jekyll-on-windows-pygments-not-working">someone has got a fix for this on StackOverflow</a>. It boils to down to an issue with the gem "pygments" (which was installed when we did a gem install of jekyll) as per the Stack Overflow post, downgrade the version of pygments to 0.5.0 like so:

{% highlight bat %}
gem uninstall pygments.rb
gem install pygments.rb --version "=0.5.0"
{% endhighlight %}

Now, try to build your Jekyll site again:

{% highlight bat %}
jekyll build
{% endhighlight %}

If you see something along the lines of:

	Liquid Exception: No such file or directory - python [ruby gem path]/pygments.rb-0.5.0/lib/pygments/mentos.py
	
It means you either don't have Python installed or you don't have the Python interpreter in your PATH variable. If you are the former and don't have Python installed, grab the nice & friendly Windows Installer at <a href="http://www.python.org/download/">http://www.python.org/download/</a>. Get a version 2 build as opposed to any 3+ versions, the version I have installed is 2.7.5. Version 3+ may work but I recall reading about some compatibility issues with 3rd party libraries - I haven't tried this so by all means have a go at using the latest version.

The version of Windows Installer I used doesn't put the <em>python</em> command into your PATH variables so it isn't globally available on the command line. If you find that you can't invoke...

{% highlight bat %}
python --version
{% endhighlight %}

... then it's not in the PATH variable. It needs to be there so lets add it. Whenever doing anything like this that might affect your system (the PATH variable is available to many programs running on your system and so altering it's contents has potential to break existing installations), always collect the data you'll need to rollback. In this case, issue the following:

{% highlight bat %}
echo %PATH%
{% endhighlight %}

Copy and paste the output from the command line to notepad and save it somewhere. The output should just be a bunch of directory paths separated by semi-colons (;) like so:

	C:\Windows\System32;C:\Program Files\SomeProgram

Now, depending on where you installed Python to (I installed to C:\Python27), run the following command:

	SET PATH=%PATH%;C:\Python27

This simply sets the PATH variable to it's current value <em>plus</em> the new directory containing the python executables.

Now should be able to issue:

{% highlight bat %}
python --version
{% endhighlight %}

For the third time, try to build your Jekyll site again:

{% highlight bat %}
jekyll build
{% endhighlight %}

You should now see a nice, clean jekyll output telling you that your site has been generated into a subdirectory of \_site. Open your web browser go file -> open. Locate the index.html from in the build subdirectory. You should see you site rendered, ready for deployment.


####3. Installing Grunt and configuring the build

When I first starting building this workflow for Windows, I used a .bat file for build automation. To establish a cross-platform build I decided to have a go with the popular JavaScript task runner <a href="http://gruntjs.com/">Grunt</a>.

Grunt has a dependency on <a href="http://nodejs.org/">Node.js</a>. It's happy with any version starting at 0.8.0. I'm using 0.10.13. If you don't have node installed, grab the latest Windows Installer from <a href="http://nodejs.org/download/">http://nodejs.org/download/</a>. Like the Ruby Windows Installer, this is a very easy installation wizard.

With node installed, we need to install the _grunt-cli_ module globally. Issue the command:

	npm install -g grunt-cli
	
This makes the command _grunt_ available to our command prompt. At this point, we still do not have the actual Grunt task runner installed, only the means to invoke an existing grunt task runner installation. This enables us to have different versions of Grunt running on different projects, which is of course, great if we're working with other developers across multiple projects.

At this point we could issue the command:

	npm install grunt
	
This would install the Grunt task runner locally to this directory (it would install to a subdirectory /node_modules). This would enable us to run a simple Grunt build. However, if you're wanting to use a build automation tool like Grunt, chances are there's a few common tasks you want to perform on every build. In my case, I want to:

- clean the build directory to remove any previous build files
- compile my compass code
- build my jekyll site into a deployable structure

Luckily, the awesome community around grunt (and these free tools and frameworks that I'm using) means there are free build task extensions available for Compass & Jekyll to get going instantly. I'm using, respectively:

- <a href="https://npmjs.org/package/grunt-contrib-compass">grunt-contrib-compass</a>
- <a href="https://npmjs.org/package/grunt-jekyll">grunt-jekyll</a>

We're almost there. There are two files that Grunt needs to be able to perform the build:

- package.json - A Node.js convention used to express information about the project including, what are interested in here, module dependencies.
- Gruntfile.js - Used to specify targets and execution order (think of this like a Makefile or csproj equivalent)

	
##### package.json	
Instead of asking Node to install each one these modules individually, we can leverage the package.json convention of Node.js to refer to a list of dependencies and issue a single command to install them all. First, create a new file "package.json" in the base directory of the project (remember this is "C:\site" for me):
 
{% highlight json %}
{
	"name": "ohn",
	"version": "1.0.0",
	"devDependencies": {
		"grunt": "0.4.1",
		"grunt-contrib-compass": "0.3.0",
		"grunt-jekyll": "0.3.8"
	}
}
{% endhighlight %}
	
Switch "name" for whatever you want to call your project, ohn refers to the domain OpenHeartNerdery.co.uk that my site is served from.

Notice the "devDependencies" key in the above json. It's in this list that you would specify your node module dependencies. Note also that "Grunt" is in there - this is the task runner that we could have installed manually earlier.

Save this file and if you want to verify the syntax of your json, run it through <a href="http://json.parser.online.fr/">http://json.parser.online.fr/</a>. This gives you instant visual feedback and can save major headaches when trying to identify syntax errors in your json.

Within the directory having the package.json file, issue the command:

	npm install
	
The Node Package Manager knows to look for a package.json and parse it's devDependencies. Anything you haven't got installed locally, it will fetch from the Node Module repository and install locally to the /node_modules subdirectory.

##### Gruntfile.js

Grunt expects us to define our build tasks in JavaScript. Here's a stripped down, esssentials-only version of a Gruntfile which will serve as a starting point. This will provide us with a simple "default" task that does nothing but output to the console that we're calling the target.

{% highlight javascript %}
module.exports = function(grunt) {
	grunt.initConfig({	
	});
	
	grunt.registerTask('default', 'Does nothing useful', function() {
		console.log('Hi, from the "default" target');
	});
};
{% endhighlight %}

If you issue the command...

	grunt
	
... you should see that Grunt picks up the Gruntfile and outputs something along the lines of:

	Running "default" task
	Hi, from the "default" target

Grunt expects there to be a "default" task if you invoke a build like this. If you wanted to call it something other than "default", you have to invoke the _grunt_ command with an extra parameter, specifying the target to execute. Say, for example, you want to target to be called "sayHello". Change your Gruntfile like:

{% highlight javascript %}
module.exports = function(grunt) {
	grunt.initConfig({	
	});
	
	grunt.registerTask('sayHello', 'Does nothing useful', function() {
		console.log('I\'m saying hello');
	});
};
{% endhighlight %}

You would have to issue the command:

	grunt sayHello


First of all, I'm going to automate the compilation of my compass code using the targets provided by the _grunt-contrib-compass_ module. First thing to do is have the Gruntfile register the targets provided by this module. Adding the following line to the Gruntfile achieves this registration:

	grunt.loadNpmTasks('grunt-contrib-compass');
	
This needs to be done for every module that you are registering for Grunt targets. Now, to invoke the the compass target, we'll make it a dependency of the default target. THe entire Gruntfile should now look like this:

{% highlight javascript %}
module.exports = function(grunt) {
	grunt.initConfig({
		compass: {
			dist: {
			}
		},
	});
	
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.registerTask('default', ['compass']);
};
{% endhighlight %}

Notice the change of parameters in the _registerTask_ method call. We're registering a target called "default" that should in turn call the target "compass" which we have defined in the initConfig section. Now, when _grunt_ is invoked, the default target invokes the _compass_ target too. The code provided by the _grunt-contrib-compass_ module effectively translates this to a call equivalent to:

	compass compile 

For me, I've configured compass using _config.rb_ so the command knows where to look for my SASS files and where to output css. If you don't know how to do this, refer to the various config flags available in the <a href="http://compass-style.org/help/tutorials/configuration-reference/" class="external-resource">compass documentation</a>.

Finally, let's add the task to build our Jekyll site. Remember, three things to do when using 3rd party targets:

- 1. Register the tasks found in the the the Node module using _registerTask_
- 2. Create and provide any options in the _initConfig_ section
- 3. Make the target a dependency of your main build task
	
The Gruntfile now looks like:

{% highlight javascript %}
module.exports = function(grunt) {
	grunt.initConfig({
		compass: {
			dist: {
			}
		},
		jekyll: {
			dist: {
				src: 'src',
				dest: 'C:\\webapps\\mysite'
			}		
		}		
	});

	grunt.loadNpmTasks('grunt-jekyll');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.registerTask('default', ['compass', 'jekyll']);
};
{% endhighlight %}

	
That's it! Running _grunt_ will compile compass code and build a deployable version of a Jekyll site. I extended my Gruntfile to cater for a debug and production version and, in it's current form, looks like:

{% highlight javascript %}
module.exports = function(grunt) {
	grunt.initConfig({
		compass: {
			debug: {
				options: {
				}
			},
			prod: {
				options: {
					outputStyle: 'compressed'
				}
			}
		},
		jekyll: {
			debug: {
				src: 'src',
				dest: 'C:\\webapps\\mysite'
			},
			prod: {
				src: './src',
				dest: 'C:\\webapps\\mysite'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-jekyll');
	grunt.registerTask('default', ['compass:debug', 'jekyll:debug']);
	grunt.registerTask('prod', ['compass:prod', 'jekyll:prod'])
};
{% endhighlight %}

Now I can run:

	grunt


for non-minified, source commented version of the compass SASS -> CSS compilation, or:

	grunt prod

to get bandwidth-friendly minified, commentless CSS.