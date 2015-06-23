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

var _moreButton = false;


// HOME SCREEN
(function() {
    var self = {};
    self.counter = 3;
    self.id = setInterval(function() {
        self.counter--;
        if (self.counter < 0) {
            $$('.launchApp').on('click', function() {
                myApp.showTab('.view-digipet');
            });
            $('.preloader').hide();
            $('small.installing').hide();
            clearInterval(self.id);
        }
    }, 1000);
})();

window.onbeforeunload = function(e) {
    return 'Are you sure you want to leave?';
};

// IN APP

var redirection = function(state) {
    window.onbeforeunload = null;
    parent.document.getElementById("frame").style.display = "none";
    parent.document.getElementById("redirectMsg").style.display = "block";


    // baseurl
    var href = "http://umfragen.ise.tu-darmstadt.de/sosci/pmob/";

    // parameters
    href += "?i=" + __ref;
    href += "&password=test";
    href += "&c=" + (state === true ? '1' : '0');
    href += "&m=" + (_moreButton === true ? '1' : '0');

    parent.window.location = href;
};

var disclosureRequest = function() {
    myApp.confirm('Are you willing to allow DigiPet to access your GPS Location?', 'Disclosure Request',
        function() {
            redirection(true);
        },
        function() {
            redirection(false);
        });
};

function moreInfo() {
    _moreButton = true;
    window.open('http://digipet.herokuapp.com/pps','_blank');
}

if (__pps) {
    var _disclosureRequest = disclosureRequest;

    disclosureRequest = function() {
        myApp.alert('<p>The DigiPet App is about to request your permission for GPS privacy disclosure.</p><ul style="text-align: left;"><li>Your location information is used to detect other users so that your pets can play together</li><li>Your location information is deleted within 24 hours</li><li>No third party will be granted access to your location information</li></ul><p><a target="_blank" onclick="moreInfo()" href="#">more information</a></p>', 'Security Information', function() {
            _disclosureRequest();
        });
    };
}



$$('.view.view-digipet').on('show', function() {
    if (!__dr) {
        disclosureRequest();
    }

    // show the activities picker
    myApp.pickerModal('.picker-activies');
});

$$('.picker-activies .activity-travel').on('click', function() {
    if (__dr) {
        disclosureRequest();
    }
});
