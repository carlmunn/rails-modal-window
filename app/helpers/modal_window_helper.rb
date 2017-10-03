module ModalWindow
  module ModalWindowHelper

    # +namespace+ Scopes the DIV elenents into something we can style or scope to
    # +selector+ Forgot...
    def insert_modal_window(namespace: nil, selector: nil, &block)

      data     = nil
      data     = {selector: selector} if selector
      _content = capture(&block) if block_given?
      
      div_centered = tag.div(class: _klasses('modal-full-window', namespace)) do
        tag.div(_content, class: 'modal-item', data: data)
      end

      tag.div(class: _klasses('modal-main', 'animated', namespace)) do
        [ div_centered, tag.div(nil, class: 'modal-background action-modal-window')].join.html_safe
      end
    end

  private
    def _klasses(*klasses)
      [*klasses].reject {|str| str.blank? }.join(' ')
    end
  end
end