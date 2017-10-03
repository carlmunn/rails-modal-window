const ModalWindow = function(opts){

  // opts.namespace
  // opts.template

  this.opts = opts;

  const animateForward = 'modal-visible-animated-in';  
  const obj            = this;
  var   modalSelector  = '.modal-main'
  var   promise        = nil //new Promise;

  // Specific modal window
  if(opts.namespace) modalSelector = modalSelector+'.'+opts.namespace;

  const _log = function(msg) {
    if(console) console.log('[L][ModalWindow]', msg);
  }

  // Selector generator that scopes to the namespace
  // Passing nothing will just give the parent "modal-main"
  const _genSel = function(selector){
    
    if(!selector) return modalSelector;

    var ary = selector.split(',').map($.proxy(function(str){
      return [modalSelector, str.trim()].join(' ');
    }, this));

    var result = ary.join(',');

    return ary.join(',');
  }

  const isOpen = function(){
    return $('body').hasClass(animateForward);
  }

  const delayedClassRemove = function(){
    setTimeout(function(){
      $('body')
        .removeClass('modal-visible')
        .removeClass('modal-visible-animated-out');
    }, 300);
  }

  // +template+ can be a DOM to a function
  //
  // DOM it will call .html() to get the contents to fill
  //
  // Function it will call and use the returned contents
  // if false it doesn't fill so one can do their own.
  const _renderTemplate = function(){

    if(!opts.template) return;

    var str = "";

    if(typeof(opts.template)=='function') {
      _log('function template, calling it');
      str = opts.template();
    } else {
      _log("Rendering template: '"+opts.template+"'");
      str = $(opts.template).html();
    }
    
    if(str!=false) $(_genSel('.modal-item')).html(str);
  }

  const _openModal = function(){
    _log("Opening modal: '"+modalSelector+"'");
    $('.modal-main').removeClass('selected')
    $(_genSel()).addClass('selected');
  }

  // Stops the background from scrolling
  const safariFix = function(enable){
    $('body').toggleClass('modal-safari-fix', enable)
  }

  this.generateSelector = function(selector){
    return _genSel(selector);
  }

  this.open = function(){
    
    _log("Opening");

    _renderTemplate();

    _openModal();

    $('body').addClass('modal-visible').addClass(animateForward);

    setTimeout(function(){
      safariFix(true);
    }, 400);
  }

  this.close = function(){
    $('body').removeClass(animateForward);
    $('body').addClass('modal-visible-animated-out');
    delayedClassRemove();
    safariFix(false);

    return promise.resolve()
  }

  this.toggle = function(){
    if(isOpen())
      this.close();
    else
      this.open();
  }

  this.attachEvents = function(selector){

    if(!selector) selector = _genSel('.action-modal-window');

    _log("Attaching events to '"+selector+"'");

    $(document).on('click touchstart', selector, function(){

      _log("'"+selector+"' event fired!");
      
      obj.toggle();
    })
  }

  _log("Loaded: '"+modalSelector+"'");

  return this;
}