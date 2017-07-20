function handle(e){
        if(e.keyCode === 13){
            e.preventDefault(); // Ensure it is only this code that rusn
            let searchParam = $('#inputSearch').val();
            window.location="/getSong?song=" + searchParam;
        }
}

//initialize google maps global variables
let initializeMaps = {};
let marker = {};
let map = {};
let setGeoCoder = {};

$(document).ready(function() {
  $('div').removeClass('menu-active');
  var pathname = window.location.pathname;  
  if (pathname.length > 1) {
    $('a[href="'+pathname+'"]').parent().addClass('menu-active');
  } else {
    $('a[href="/history"]').parent().addClass('menu-active');
  }
});
