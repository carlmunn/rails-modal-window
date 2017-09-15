# Rails Engine/Plugin for a basic modal window

Something to avoid having to keep repeating myself. The code consists of SCSS and Javascript. Still working on this.

Animates a modal which is centered. Handles scrolling and blurs background with a gradient/transparent black

Using Flex Boxes and CSS3, so I'm not planning this will work with all

Dependent on jQuery (plan of having it independent)

## Getting started

Add to `Gemfile`
```ruby
gem 'modal_window'
```

Sprocket's "require" for CSS and Javascript
```
*= require 'modal_window/all'
//= require 'modal_window/all'
```

Add view helper as the last DOM child of `body`. `modal-shadow` is optional
```html
<%= insert_modal_window %>
  <div class='modal-shadow'>Content</div>
<% end %>
```

Javascript
```javascript
const modal = new ModalWindow;

 // For manual open
modal.open();

// Uses '.action-modal-window' to open and close, so add it to a button
modal.attachEvents(); 
```
