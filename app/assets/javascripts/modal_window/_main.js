const ModalWindow = function(opts){

  this.opts = opts

  const _log = function(msg) {
    if(console) console.log('[L][ModalWindow]', msg);
  } 
  // opts.content
  // opts.id

  this.open = function(){
    
    _log("Opening");

    $('body').addClass('modal-visible-animated');
  }

  this.close = function(){
    $('body').removeClass('modal-visible-animated');
  }

  this.attachEvents = function(selector){

    _log("Attaching events");

    if(!selector) selector = '.action-modal-window';

    $(document).on('click touch', selector, function(){

      _log("'action-modal-window' event fired!");
      
      $('body').toggleClass('modal-visible-animated');
    })
  }



  // this._getEl(){
  //   if(his.opts.id)
  //     document.getElementById(his.opts.id)
  //   else
  //     document.getElementsByClassName('modal-main')
  // }
  _log("Loaded");

  return this;
}