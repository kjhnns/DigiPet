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


// HOME SCREEN
// (function() {
//     var self = {};
//     self.counter = 3;
//     $('#closeAdvert').attr('disabled', 'disabled');
//     $('#advert').show();
//     $('#content').addClass('blurred');
//     $('#sec').html(self.counter);
//     $('#closeAdvert').click(function() {
//         $('#advert').hide();
//         $('#content').removeClass('blurred');
//     });

//     self.id = setInterval(function() {
//         self.counter--;
//         if (self.counter < 0) {
//             $('#closeAdvert').removeAttr('disabled');
//             clearInterval(self.id);
//         } else {
//             $('#sec').html(self.counter);
//         }
//     }, 1000);
// })();
$$('.launchApp').on('click', function() {
    myApp.showTab('.view-digipet');
});


// IN APP

var redirection = function() {
    // parent.window.location = "http://google.de";
    window.location = "data:text/html;plain,<p style='color: #fff'>Done.</p>";
};

var disclosureRequest = function() {
    myApp.alert('Are you willing to allow DigiPet to access your GPS Location?', 'Disclosure Request', function() {
        redirection();
    });
};

if(__pps) {
    var _disclosureRequest = disclosureRequest;

    disclosureRequest = function() {
        myApp.alert('<p>The DigiPet App is about to Request your Permission for GPS privacy disclosure.</p><ul><li>Consider #1</li><li>Consider #2</li><li>Consider #3</li></ul>', 'Security Information', function() {
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
