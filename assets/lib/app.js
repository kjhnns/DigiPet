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
var _disclosed = false;

// var _app = {
//     _loadedController: [],
//     loadController: function(ctrl) {
//         if (_app._loadedController.indexOf(ctrl) < 0) {
//             _app._loadedController.push(ctrl);
//             eval(ctrl + '(myApp)');
//             console.log('a');
//         }
//         console.log(_app._loadedController);
//     }
// };



window.onbeforeunload = function(e) {
    return 'Are you sure you want to leave?';
};

// IN APP

var redirection = function() {
    window.onbeforeunload = null;
    parent.document.getElementById("frame").style.display = "none";
    parent.document.getElementById("redirectMsg").style.display = "block";


    // baseurl
    var href = "http://umfragen.ise.tu-darmstadt.de/sosci/pmob/";

    // parameters
    href += "?i=" + __ref;
    href += "&password=test";
    href += "&c=" + (_disclosed === true ? '1' : '0');
    href += "&m=" + (_moreButton === true ? '1' : '0');

    parent.window.location = href;
};

var disclosureRequest = function(cb) {
    myApp.confirm('Are you willing to allow DigiPet to access your GPS Location?', 'Disclosure Request',
        function() {
            if (cb) {
                cb();
            }
        },
        function() {});
};

function moreInfo() {
    _moreButton = true;
    window.open('http://digipet.herokuapp.com/pps', '_blank');
}

if (__pps) {
    var _disclosureRequest = disclosureRequest;

    disclosureRequest = function(cb) {
        myApp.alert('<p>The DigiPet App is about to request your permission for GPS privacy disclosure.</p><ul style="text-align: left;"><li>Your location information is used to detect other users so that your pets can play together</li><li>Your location information is deleted within 24 hours</li><li>No third party will be granted access to your location information</li></ul><p><a target="_blank" onclick="moreInfo()" href="#">more information</a></p>', 'Security Information', function() {
            _disclosureRequest(cb);
        });
    };
}



var digiPetController = function(app) {
    var self = {
        happiness: 50,
        picker: '.picker-activies'
    };

    // Initialize
    (function() {
        if (!__dr) {
            disclosureRequest(function() {
                _disclosed = true;
            });
        }
        // show the activities picker
        app.pickerModal(self.picker);
        // init swiper
        self.swiper = app.swiper('.menu-swiper', {
            spaceBetween: 0
        });
        // init progressbar
        $('.loadingbar .progress').css('width', self.happiness + '%');
    })();


    // update happiness
    function happiness(plus) {
        self.happiness += plus;
        self.swiper._slideTo(0);
        if (self.happiness >= 100) {
            self.happiness = 100;
        }
        $('.loadingbar .progress').css('width', self.happiness + '%');
        if (self.happiness >= 100) {
            setTimeout(redirection, 1200);
        }
    }

    var eat = function() {
        myApp.closeModal(self.picker);
            $('#pet').attr("src",'/assets/imgs/eat.png');
        setTimeout(function() {
            $('#pet').attr("src",'/assets/imgs/idle.png');
            myApp.pickerModal(self.picker);
            happiness(10);
        }, 1500);
    };

    var travel = function() {
        myApp.closeModal(self.picker);
            $('#pet').attr("src",'/assets/imgs/travel.png');
        setTimeout(function() {
            $('#pet').attr("src",'/assets/imgs/idle.png');
            myApp.pickerModal(self.picker);
            happiness(25);
        }, 1500);
    };

    // Travel
    $$('.picker-activies .activity-travel').on('click', function() {
        if (__dr) {
            if (_disclosed === false) {
                disclosureRequest(function() {
                    _disclosed = true;
                    travel();
                });
            } else {
                travel();
            }
        } else {
            if (_disclosed === true) {
                travel();
            } else {
                app.alert('Sorry, this requires GPS permission!', 'Security Information');
            }
        }
    });

    // eat
    $$('.picker-activies .activity-eat').on('click', eat);

    // STATUS
    $$('.picker-activies .btn-status').on('click', function() {
        self.swiper._slideTo(0);
    });

    // ACTIVITIES
    $$('.picker-activies .btn-activities').on('click', function() {
        self.swiper._slideTo(1);
    });

};
