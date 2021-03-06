// opts.namespace [CSS selector]
// opts.template  [CSS selector| function]
const ModalWindow = function(opts){

  if(!opts) opts = {}
  this.opts = opts;
  
  const animateForward  = 'modal-visible-animated-in';
  const animateBackward = 'modal-visible-animated-out';

  const obj            = this;
  var   modalSelector  = '.modal-main'

  // Specific modal window
  if(opts.namespace) modalSelector = modalSelector+'.'+opts.namespace;

  const _log = function(msg) {
    if(console && window.logModalWindow)
      console.log('[L][ModalWindow]', msg);
  }

  const _debug = function(msg) {
    if(console && window.debugModalWindow)
      console.log('[D][ModalWindow]', msg);
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
    return $('body').hasClass('modal-visible');
  }

  const delayedClassRemove = function(){
    setTimeout(function(){
      $('body')
        .removeClass('modal-visible')
        .removeClass(animateBackward);
    }, 300);
  }

  parseTemplate = function(hsh, str){

    for (var _key in hsh) {
      _debug("checking for key '"+_key+"' value '"+hsh[_key]+"'")
      str = str.replace("{{"+_key+"}}", hsh[_key])
    }

    return str
  }
  // +template+ can be a DOM to a function
  //
  // DOM it will call .html() to get the contents to fill
  //
  // Function it will call and use the returned contents
  // if false it doesn't fill so one can do their own.
  const _renderTemplate = function(options){

    if(!opts.template) return;

    var str = "";

    if(typeof(opts.template)=='function') {
      _debug('function template, calling it');
      str = opts.template(obj);
    } else {
      _debug("Rendering template: '"+opts.template+"'")
      
      str = $(opts.template).html()
      str = parseTemplate(options, str)
    }
    
    if(str!=false) $(_genSel('.modal-item')).html(str);
  }

  const _openModal = function(){
    _debug("Opening modal: '"+modalSelector+"'");
    $('.modal-main').removeClass('selected')
    $(_genSel()).addClass('selected');
  }

  // Stops the background from scrolling
  const safariFix = function(enable){
    $('body').toggleClass('modal-safari-fix', enable)
  }

  // Called on #close; #open returns the Promise
  var _promiseResolve = function(options){
    return options
  }

  this.open = function(options){

    _renderTemplate(options);

    _openModal();

    $('body').addClass('modal-visible').addClass(animateForward);

    setTimeout(function(){ safariFix(true); }, 400);

    const _promise = new Promise(function(resolve, reject){
      _promiseResolve = resolve
    });

    return _promise;
  }

  this.close = function(options){

    _debug("Closing")

    $('body').removeClass(animateForward);
    $('body').addClass(animateBackward);

    delayedClassRemove();

    safariFix(false);

    _promiseResolve(options)

    return obj;
  }

  this.generateSelector = function(selector){
    return _genSel(selector);
  }

  this.toggle = function(){
    if(isOpen())
      this.close();
    else
      this.open();
  }

  // Just a helper, you can use the open/close ya self
  //
  // With no classSelector it will attach to close by 
  // touching/clicking the out side background area
  this.attachEvents = function(classSelector){
    
    if(!classSelector) {
      classSelector = 'modal-full-window'
      var cssSelector = _genSel("."+classSelector)
    } else {
      var cssSelector = "."+classSelector
    }

    _debug("Attaching events (click touchstart) to '"+cssSelector+"'")

    $(document).on('click touchstart', cssSelector, function(event){
      const el = $(event.target)

      if(el.hasClass(classSelector)) {
        event.preventDefault();
        _debug("'"+cssSelector+"' event fired! event target: ", event)
        obj.toggle()
      }
    })
  }

  _debug("Loaded: '"+modalSelector+"'")

  return this;
}