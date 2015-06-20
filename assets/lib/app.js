// Initialize app and store it to myApp variable for futher access to its methods
var myApp = new Framework7({
    pushState: true,
});

// We need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});


var digiPet = myApp.addView('.view-digipet');



$$('.launchApp').on('click', function () {
    myApp.showTab('.view-digipet');
});

// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function(page) {
    // Do something here for "about" page
    myApp.alert('Here comes About page');
    mainView.showToolbar();
});
