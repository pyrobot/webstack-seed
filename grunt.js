var http = require('http'),
    server = require('./app/server/express_server.js');

var serverPort = 8111;

module.exports = function (grunt) {
  // grunt npm module: run shell commands as grunt tasks
  grunt.loadNpmTasks('grunt-exec');

  // initialize grunt
  grunt.initConfig({
    exec: {
      // Clean Steps
      clean_build_folder: {
        command: 'rm -rf ./build'
      },
      clean_bootstrap_css: {
        command: 'rm -rf ./app/lib/bootstrap/css/*.*'
      },
      clean_bootstrap_js: {
        command: 'rm -rf ./app/lib/bootstrap/bootstrap.*'
      },
      clean_angular_js: {
        command: 'rm -rf ./app/lib/angular/angular.*'
      },
      clean_app: {
        command: 'rm -rf ./app/build'
      },
      // Build Steps
      build_jade_index: {
        command: 'jade app/views/index.jade --out build',
        stdout: true
      },
      build_jade_partials: {
        command: 'jade app/views/partials/*.jade --out build/partials',
        stdout: true
      },
      build_bootstrap_from_less: {
        command: 'recess --compile app/lib/bootstrap/less/bootstrap.less > app/lib/bootstrap/css/bootstrap.css',
        stdout: true
      },
      minify_bootstrap_css: {
        command: 'cleancss app/lib/bootstrap/css/bootstrap.css -o app/lib/bootstrap/css/bootstrap.min.css --s0',
        stdout: true
      },
      minify_app_css: {
        command: 'cleancss ./app/build/app.css -o ./app/build/app.min.css --s0'
      },
      copy_app_css: {
        command: 'cp ./app/build/app.min.css ./build/app.css'
      },
      copy_font_awesome: {
        command: 'cp -r ./app/lib/font-awesome/font ./build/font'
      },
      copy_app: {
        command: 'cp ./app/build/app.min.js ./build/app.js'
      },
      copy_framework: {
        command: 'cp ./app/build/framework.min.js ./build/framework.js'
      },
      // Testing Steps
      run_e2e_test_suite: {
        command: 'testacular start ./test/config/testacular-e2e.conf.js',
        stdout: true
      },
      run_unit_test_suite: {
        command: 'testacular start ./test/config/testacular-once.conf.js',
        stdout: true
      }

    },
    lint: {
      files: ['grunt.js', 'lib/*.js', 'test/*.js']
    },
    concat: {
      bootstrap: {
        src: [
        './app/lib/bootstrap/js/bootstrap-transition.js',
        './app/lib/bootstrap/js/bootstrap-modal.js',
        './app/lib/bootstrap/js/bootstrap-dropdown.js',
        './app/lib/bootstrap/js/bootstrap-scrollspy.js',
        './app/lib/bootstrap/js/bootstrap-tab.js',
        './app/lib/bootstrap/js/bootstrap-tooltip.js',
        './app/lib/bootstrap/js/bootstrap-popover.js',
        './app/lib/bootstrap/js/bootstrap-affix.js',
        './app/lib/bootstrap/js/bootstrap-alert.js',
        './app/lib/bootstrap/js/bootstrap-button.js',
        './app/lib/bootstrap/js/bootstrap-collapse.js',
        './app/lib/bootstrap/js/bootstrap-carousel.js',
        './app/lib/bootstrap/js/bootstrap-typeahead.js'
        ],
        dest: './app/lib/bootstrap/bootstrap.js'
      },
      angular: {
        src: [
        './app/lib/angular/angular-core.js',
        './app/lib/angular/angular-cookies.js',
        './app/lib/angular/angular-resource.js',
        './app/lib/angular/angular-sanitize.js'
        ],
        dest: './app/lib/angular/angular.js'
      },
      app: {
        src: [
          './app/js/app.js',
          './app/js/controllers.js',
          './app/js/directives.js',
          './app/js/filters.js',
          './app/js/services.js'
        ],
        dest: './app/build/app.js'
      },
      framework: {
        src: [
          './app/lib/jquery/jquery.min.js',
          './app/lib/bootstrap/bootstrap.js',
          './app/lib/angular/angular.js',
          './app/lib/sockjs/sockjs.min.js'
        ],
        dest: './app/build/framework.js'
      },
      app_css: {
        src: [
          './app/lib/bootstrap/css/bootstrap.min.css',
          './app/css/app.css'
        ],
        dest: './app/build/app.css'
      }
    },
    min: {
      bootstrap: {
        src: './app/lib/bootstrap/bootstrap.js',
        dest: './app/lib/bootstrap/bootstrap.min.js'
      },
      angular: {
        src: './app/lib/angular/angular.js',
        dest: './app/lib/angular/angular.min.js'
      },
      app: {
        src: './app/build/app.js',
        dest: './app/build/app.min.js'
      },
      framework: {
        src: './app/build/framework.js',
        dest: './app/build/framework.min.js'
      }
    },
    relax: {
      app: {
        src: './app/build/app.js',
        dest: './app/build/app.js'
      }
    }
  });

  var taskList = [{
    name: 'build',
    cmds: 'build_all'
  },{
    name: 'build_all',
    cmds: 'clean_all build_jade build_bootstrap build_angular build_app copy_app build_app_css copy_app_css build_framework copy_framework copy_font_awesome'
  },{
    name: 'build_bootstrap_css',
    cmds: 'exec:build_bootstrap_from_less exec:minify_bootstrap_css'
  },{
    name: 'build_bootstrap_js',
    cmds: 'concat:bootstrap min:bootstrap'
  },{
    name: 'build_bootstrap',
    cmds: 'build_bootstrap_css build_bootstrap_js'
  },{
    name: 'build_angular',
    cmds: 'concat:angular min:angular'
  },{
    name: 'build_app',
    cmds: 'concat:app relax:app min:app'
  },{
    name: 'build_app_css',
    cmds: 'build_bootstrap concat:app_css exec:minify_app_css'
  },{
    name: 'build_framework',
    cmds: 'concat:framework min:framework'
  },{
    name: 'build_jade',
    cmds: 'exec:build_jade_index exec:build_jade_partials'
  },{
    name: 'clean',
    cmds: 'clean_all'
  },{
    name: 'clean_all',
    cmds: 'clean_build clean_bootstrap clean_angular clean_app'
  },{
    name: 'clean_build',
    cmds: 'exec:clean_build_folder'
  },{
    name: 'clean_bootstrap',
    cmds: 'exec:clean_bootstrap_css exec:clean_bootstrap_js'
  },{
    name: 'clean_angular',
    cmds: 'exec:clean_angular_js'
  },{
    name: 'clean_app',
    cmds: 'exec:clean_app'
  },{
    name: 'copy_app',
    cmds: 'exec:copy_app'
  },{
    name: 'copy_app_css',
    cmds: 'exec:copy_app_css'
  },{
    name: 'copy_font_awesome',
    cmds: 'exec:copy_font_awesome'
  },{
    name: 'copy_framework',
    cmds: 'exec:copy_framework'
  },{
    name: 'e2e',
    cmds: 'lint server exec:run_e2e_test_suite'
  },{
    name: 'unit',
    cmds: 'lint exec:run_unit_test_suite'
  }];

  grunt.registerTask('test', 'prompt', function() { grunt.log.writeln('The following tests are available: \ne2e\nunit'); });

  taskList.forEach(function (task) {
    grunt.registerTask(task.name, task.cmds);
  });

  // Register the default 'grunt'
  grunt.registerTask('default', 'Display commands', function() {
    grunt.log.writeln('The following commands are available: ');
    taskList.forEach(function (task) {
      grunt.log.write(task.name + '\n');
    });
  });

  // create a task that removes 'use strict' directives from the final builds,
  // helpful when combining the app scripts since they all contain 'use strict';
  // derived from grunt-lenient but modified into a multitask
  grunt.registerMultiTask('relax', 'remove "use strict"; directives (as part of build task)', function() {
    var sourceCode = '', data = this.data;

    if (!data.src) {
      grunt.warn('Missing src property.');
      return false;
    }

    if (!data.dest) {
      grunt.warn('Missing dest property.');
      return false;
    }

    sourceCode = '' + grunt.file.read(data.src, {encoding: 'utf8'});
    sourceCode = sourceCode.replace(/("|')use strict\1;?/g, '');
        
    grunt.file.write(data.dest, sourceCode, {encoding: 'utf8'});
  });

  grunt.registerTask('server', 'Start the appllication web server.', function() {
    http.createServer(server).listen(serverPort, function(){
      grunt.log.writeln('Starting web server on port ' + serverPort + '.');
    });
  });
};