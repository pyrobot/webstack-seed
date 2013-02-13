#WebStack seed
---

Next gen, Single Page Web Application scaffolding. Based off the [angular-seed](https://github.com/angular/angular-seed) repo, with a few extras...

Useful for quickly developing AngularJS modules with some 

###What does it do?
---

Quickly sets up a project that uses the following open source technologies:

-  __Express/Jade__ (Modular Web Server / View Template Engine) [expressjs.com](http://expressjs.com) [jade-lang.com](http://jade-lang.com)
-  __AngularJS__ (Client Side MVC Framework) [angularjs.org](http://angularjs.org/) 
-  __Jasmine/Testacular__ (BDD Test Specs / Spec Runner) [jasmine](http://pivotal.github.com/jasmine/) [testacular](http://vojtajina.github.com/testacular/)
-  __jQuery__ (Cross Browser Toolset) [jquery.com](http://jquery.com/)
-  __SockJS__ (WebSocket-like Transports) [sockjs](https://github.com/sockjs/sockjs-client)
-  __Bootstrap__ (Front End Library) [getbootstrap.com](http://getbootstrap.com)
-  __Font Awesome__ (Vector Icons) [font-awesome](http://fortawesome.github.com/Font-Awesome/)
-  __Grunt__ (JavaScript Build Tool) [gruntjs.com](http://gruntjs.com/)

#####OK.. Anything else?

Like the [angular-seed](https://github.com/angular/angular-seed) repo, it sets up a similar app structure, except the library directory has been expanded to include jQuery, Bootstrap, Font Awesome, and SockJS.

The server has been replaced with an express server, and the example AngularJS project that demonstrates how to hook up controllers has been changed to a jade version. It also links to development versions (unminified) of the included client side libraries. Bootstrap links directly to the LESS files and invididual js modules.

The gruntfile included has a series of build steps that can be run to create a "production" version, that compresses all of the library files down to one: framework.js. It also compresses the app, controller, directives, filters, and services files into a seperate "app.js" This way, frequently changing code can have it's own file, and not affect the overall cached version of the framework.js (that's not likely to change as often)

####How do I use it?
---


To build the framework.js and app.js, you need the following installed globally:

  	npm install -g grunt jade recess clean-css testacular

_(You may need to run sudo first, depending on your system)_

<br>

 Then to begin the build process, run:

  	grunt build
  	
 This will create a build folder that serves the combined/minified files, along with a custom Bootstrap+Font_Awesome combined/minified CSS file, and the static html generated from rendering the __app/views/index.jade__
 
####Running the server
---

Start up the server by running:

	$ ./server.js
	Express server listening on port 8000
 
#####Options:

	Usage: server.js [options]

	  Options:

    	-h, --help           output usage information
	    -V, --version        output the version number
	    -p, --port [number]  Use specified port
	    -D, --dev            Development mode (default)
	    -P, --prod           Production mode

#####Development mode

- Serves individual library files as uncompressed, development versions. 
- Links to Bootstrap .LESS files directly.
- Each app.js, controllers.js, directives.js, filters.js, services.js is served seperately.

#####Production mode

- Serves the compressed __framework.js__ and __app.js__
- Compiles Bootstrap and font-awesome into one minified CSS file __app.css__
- __Inline loads an async script loader__ [$script](https://github.com/ded/script.js) _(Then bootstraps itself)_

Needless to say the production mode performance boost is pretty nice.

<br>

##Testing (E2E / Unit)
---

Testing is done with [testacular](http://vojtajina.github.com/testacular/) 

They are the same tests demonstrated in the [angular-seed](https://github.com/angular/angular-seed)

To run the End to End tests:

	grunt e2e
	
To run the Unit tests (once):

	grunt unit
	
to have the testacular server run continuously (and rerun tests every time a file changes):

	npm test

