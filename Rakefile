task :default => :build

task :build do
  `cat src/javascripts/*.js src/javascripts/contrasaurus/*.js src/javascripts/contrasaurus/*/*.js > site/javascripts/contrasaurus.js`
  `staticmatic build .`
end
