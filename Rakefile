task :default => [:build, :zip]

task :build do
  sh "mkdir -p site/javascripts/editors"
  sh "mkdir -p site/javascripts/test"
  sh "cat src/javascripts/*.js src/javascripts/contrasaurus/*.js src/javascripts/contrasaurus/*/*.js > site/javascripts/contrasaurus.js"
  sh "cp src/javascripts/editors/* site/javascripts/editors/"
  sh "cp src/javascripts/matrix.js src/javascripts/jquery-1.4.2.min.js src/javascripts/jquery.mousewheel.js src/javascripts/qunit.js site/javascripts/"
  sh "cp src/javascripts/test/matrix.js site/javascripts/test/"
  sh "cp src/manifest.json site/manifest.json"
  sh "cp src/javascripts/run.js site/javascripts/run.js"
  sh "staticmatic build ."
end

task :doc do
  puts `java -jar ~/jsdoc-toolkit/jsrun.jar ~/jsdoc-toolkit/app/run.js -c=jsdoc.conf`
end

task :zip do
  `zip -r site.zip site/`
end
