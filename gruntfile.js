module.exports = function (grunt) {
  //grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    exec: {
      exec_babel: {
        cmd: 'babel CommentBox.jsx --out-file CommentBox-compiled.jsx',
        cwd: './components'
      },
      exec_webpack: {
        cmd: 'webpack'
      }
    },
    watch: {
        express: {
            files: ['routes/*.js'],
            tasks: ['express:dev'],
            options: {
                spawn: true,
                livereload: true
            }
        }
    },
    express: {
        dev: {
            options: {
                script: 'server.js',
            }
        }
    }
  });
  grunt.registerTask('default', '', function() {
      var taskList = [
          'express:dev',
          'watch'
      ];
      grunt.task.run(taskList);
  });

//  grunt.registerTask('default', ['exec']);

}
