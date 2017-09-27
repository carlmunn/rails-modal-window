$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "modal_window/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "modal_window"
  s.version     = ModalWindow::VERSION
  s.authors     = ["Carl Munn"]
  s.email       = ["me@carlmunn.com"]
  s.homepage    = ""
  s.summary     = "Helpers to structure a single modal popup"
  s.description = "Contains helpers and SCSS"
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  s.add_dependency "rails", "~> 5.0"

  #s.add_development_dependency "sqlite3"
end
