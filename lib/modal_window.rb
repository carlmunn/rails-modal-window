
module ModalWindowHelper
  class Engine < ::Rails::Engine
   config.to_prepare do
      ::ApplicationController.helper(ModalWindow::ModalWindowHelper)
   end
  end
end
