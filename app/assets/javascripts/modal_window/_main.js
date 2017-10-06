// opts.namespace [CSS selector]
// opts.template [CSS selector| function]
const ModalWindow = function(opts){

  if(!opts) opts = {}
  this.opts = opts;

  const animateForward = 'modal-visible-animated-in';  
  const obj            = this;
  var   modalSelector  = '.modal-main'

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

  parseTemplate = function(hsh, str){

    for (var _key in hsh) {
      _log("checking for key '"+_key+"' value '"+hsh[_key]+"'")
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
      _log('function template, calling it');
      str = opts.template(obj);
    } else {
      _log("Rendering template: '"+opts.template+"'")
      
      str = $(opts.template).html()
      str = parseTemplate(options, str)
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

  // Called on #close; #open returns the Promise
  var _promiseResolve = function(options){
    return options
  }

  this.open = function(options){

    _log("Opening");

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

    _log("Closing")

    $('body').removeClass(animateForward);
    $('body').addClass('modal-visible-animated-out');

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