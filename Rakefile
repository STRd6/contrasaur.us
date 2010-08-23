task :default => :build

task :build do
  puts `cat src/javascripts/*.js src/javascripts/contrasaurus/*.js src/javascripts/contrasaurus/*/*.js > site/javascripts/contrasaurus.js`
  puts `cp src/javascripts/editors/* site/javascripts/editors/`
  puts `cp src/javascripts/matrix.js src/javascripts/jquery-1.4.2.min.js src/javascripts/jquery.mousewheel.js src/javascripts/qunit.js site/javascripts/`
  puts `cp src/javascripts/test/matrix.js site/javascripts/test/`
  puts `staticmatic build .`
end

task :doc do
  puts `java -jar jsdoc-toolkit/jsrun.jar jsdoc-toolkit/app/run.js -c=jsdoc.conf`
end

