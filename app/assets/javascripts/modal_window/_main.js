const ModalWindow = function(opts){

  // opts.content
  // opts.id

  this.opts = opts;

  const animateForward = 'modal-visible-animated-in';  
  const obj            = this;

  const _log = function(msg) {
    if(console) console.log('[L][ModalWindow]', msg);
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

  // Stops the background from scrolling
  const safariFix = function(enable){
    $('body').toggleClass('modal-safari-fix', enable)
  }

  this.open = function(){
    
    _log("Opening");

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
  }

  this.toggle = function(){
    if(isOpen())
      this.close();
    else
      this.open();
  }

  this.attachEvents = function(selector){

    if(!selector) selector = '.action-modal-window';

    _log("Attaching events to '"+selector+"'");

    $(document).on('click touchstart', selector, function(){

      _log("'"+selector+"' event fired!");
      
      obj.toggle();
    })
  }

  _log("Loaded");

  return this;
}