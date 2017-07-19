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
