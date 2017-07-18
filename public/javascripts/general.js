//search event 
$("#btnSearch").click(function() {
    let searchParam = $('#inputSearch').val();
    window.location="/getSong?song=" + searchParam;    
});

let initializeMaps = {};
let marker = {};
let map = {};
let setGeoCoder = {};