module ModalWindow::ModalWindowHelper
  def insert_modal_window(klass: nil, selector: nil, &block)

    data     = nil
    data     = {selector: selector} if selector
    _content = capture(&block) if block_given?
    
    div_centered = tag.div(class: 'modal-full-window') do
      tag.div(_content, class: ['modal-item', klass].compact.join(' '), data: data)
    end

    tag.div(class: 'modal-main animated') do
      [ div_centered, tag.div(nil, class: 'modal-background action-modal-window')].join.html_safe
    end
  end
end