//search event 
$("#btnSearch").click(function() {
    let searchParam = $('#inputSearch').val();
    window.location="/getSong?song=" + searchParam;    
});