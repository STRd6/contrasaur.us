task :default => :build

task :build do
  `cat src/javascripts/*.js src/javascripts/contrasaurus/*.js src/javascripts/contrasaurus/*/*.js > site/javascripts/contrasaurus.js`
  `cp src/javascripts/editors/* site/javascripts/editors/`
  `staticmatic build .`
end
