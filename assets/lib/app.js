// Initialize app and store it to myApp variable for futher access to its methods
var myApp = new Framework7({
    pushState: true
});

// We need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Adding views
var digiPetView = myApp.addView('.view-digipet');
var settingsView = myApp.addView('.view-settings');
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});


var _moreButton = false;
var _disclosed = false;


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

var disclosureRequest = function(cbOk, ckCa) {
    myApp.confirm('Are you willing to allow DigiPet to access your GPS Location?', 'Disclosure Request',
        function() {
            if (cbOk) {
                cbOk();
            }
        },
        function() {
            if (ckCa) {
                ckCa();
            }
        });
};

function moreInfo() {
    _moreButton = true;
    window.open('http://digipet.herokuapp.com/pps', '_blank');
}

(function() {
    if (__pps) {
        var eventListener = false;
        var _disclosureRequest = disclosureRequest;
        disclosureRequest = function(cbo, cbc) {
            myApp.closePanel();
            myApp.closeModal('.picker-activies');
            myApp.popup('.popup-pps');
            $('.popup-overlay.modal-overlay-visible').hide();
            if (eventListener === false) {
                $$('.popup .btn-okay').on('click', function() {
                    $('.popup-overlay.modal-overlay-visible').show();
                    myApp.pickerModal('.picker-activies');
                    myApp.closeModal('.popup-pps');
                    _disclosureRequest(cbo, cbc);
                });
                eventListener=true;
            }
        };
    }
})();

var digiPetController = function(app) {
    var self = {
        happiness: 50,
        picker: '.picker-activies',
        activityTime: 1500
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
        $('.progressbar .progress').css('width', self.happiness + '%');
    })();


    // update happiness
    function happiness(plus) {
        self.happiness += plus;
        self.swiper._slideTo(0);
        if (self.happiness >= 100) {
            self.happiness = 100;
        }
        if (self.happiness >= 70 && self.happiness < 90) {
            $('.progressbar .progress').css('background', '#5cb85c');
        }

        if (self.happiness >= 90) {
            $('.progressbar .progress').css('background', '#4cae4c');
        }

        $('.progressbar .progress').css('width', self.happiness + '%');
        if (self.happiness >= 100) {
            setTimeout(redirection, 1200);
        }

        $('.pet .plus').html('+' + plus + '%');
        setTimeout(function() {
            $('.pet .plus').html('');
        }, self.activityTime);
    }


    var eat = function() {
        myApp.closeModal(self.picker);
        $('#pet').attr("src", '/assets/imgs/eat.png');
        happiness(10);
        setTimeout(function() {
            $('#pet').attr("src", '/assets/imgs/idle.png');
            myApp.pickerModal(self.picker);
        }, self.activityTime);
    };

    var travel = function() {
        myApp.closeModal(self.picker);
        $('#pet').attr("src", '/assets/imgs/travel.png');
        happiness(25);
        setTimeout(function() {
            $('#pet').attr("src", '/assets/imgs/idle.png');
            myApp.pickerModal(self.picker);
        }, self.activityTime);
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
                app.alert('<p>Sorry, this requires GPS permission!</p><p>You can change your preferences in the settings menu!</p>', 'Security Information');
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
