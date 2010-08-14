task :default => :build

task :build do
  `cat src/javascripts/*.js src/javascripts/contrasaurus/*.js src/javascripts/contrasaurus/*/*.js > site/javascripts/contrasaurus.js`
  `cp src/javascripts/editors/* site/javascripts/editors/`
  `cp src/javascripts/matrix.js src/javascripts/jquery-1.4.2.min.js site/javascripts/`
  `staticmatic build .`
end
