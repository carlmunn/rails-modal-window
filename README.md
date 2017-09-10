# Rails Engine/Plugin for a basic modal window

Wanted something to avoid having to keep repeating myself. The code mainly consists of SCSS and Javascript. I'm still working on this.

It animates a modal which is centered, handles scrolling, blurs background with a gradient/transparent black

I've using Flex Boxes and CSS3, so I'm not planning this will work with all

Depends on jQuery (plan of having it independent of this), and SCSS/Sprockets but Rails should these out. I haven't included their independences yet.

## Getting started

Add the to `Gemfile`
```ruby
gem 'modal_window'
```

Add Sprockets requires for CSS and Javascript
```
*= require 'modal_window/all'
//= require 'modal_window/all'
```

Add view helper as the last DOM child of `body`

```html
<%= insert_modal_window %>
  <div>Content</div>
<% end %>
```

Javascript
```javascript
const modal = new ModalWindow 

 // For manual open
modal.open()

// Uses '.action-modal-window' to open and close, so add it to a button
modal.attachEvents(); 
```