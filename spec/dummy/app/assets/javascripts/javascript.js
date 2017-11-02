document.addEventListener("DOMContentLoaded", function(){
  console.info('JS Loaded')

  var modal = new ModalWindow({namespace: 'example-1'})
  modal.attachEvents();

  document.getElementById('btn-open-example-1').addEventListener("click", function(){
    console.info('Opening')
    modal.open();
  }.bind(this))
})

