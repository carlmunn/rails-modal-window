module ModalWindow
  module ModalWindowHelper

=begin
  <!-- Structure -->
  <div class="modal-main animated">
    <div class='modal-centered'>
      <div class='modal-item'>Content</div>
    </div>

    <div class='modal-background'></div>
  </div>
=end

    def insert_modal_window(selector: nil, &block)

      data = nil

      _content = if block_given?
        capture(&block)
      elsif selector
        data = {selector: selector}
      else
        nil
      end
      
      div_centered = tag.div(class: 'modal-centered') do
        tag.div(_content, class: 'modal-item', data: data)
      end

      tag.div(class: 'modal-main animated') do
        [ div_centered, tag.div(nil, class: 'modal-background action-modal-window')].join.html_safe
      end
    end

    private
    def _tag(*args, &block)
      tag(*args, &block)
    end
  end
end