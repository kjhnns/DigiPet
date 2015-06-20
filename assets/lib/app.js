// Initialize app and store it to myApp variable for futher access to its methods
var myApp = new Framework7({
    pushState: true
});

// We need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Adding views
var digiPet = myApp.addView('.view-digipet');
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});


// User Story
$$('.launchApp').on('click', function() {
    myApp.showTab('.view-digipet');
});

var redirection = function() {
    myApp.alert("REDIRECT");
    // parent.window.location = "http://google.de";
};

var disclosureRequest = function() {
    myApp.alert('Are you willing to allow DigiPet to access your GPS Location?', 'Disclosure Request', function() {
        redirection();
    });
};


$$('.view.view-digipet').on('show', function() {
    if (__pps) {
        disclosureRequest();
    }

    // show the activities picker
    myApp.pickerModal('.picker-activies');
});

$$('.picker-activies .activity-travel').on('click', function() {
    if (!__pps) {
        disclosureRequest();
    }
});
