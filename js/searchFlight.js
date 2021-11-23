const details = [
    {
        logo: "indigoLogo.svg",
        arr: "9:05",
        dep: "11:15",
        price: "2957",
        no: "1"
    },
    {
        logo: "spicejetLogo.svg",
        arr: "12:05",
        dep: "2:15",
        price: "7534",
        no: "2"
    },
    {
        logo: "vistaraLogo.svg",
        arr: "10:05",
        dep: "12:15",
        price: "3565",
        no: "3"
    },
    {
        logo: "indigoLogo.svg",
        arr: "16:05",
        dep: "18:15",
        price: "5432",
        no: "4"
    },
    {
        logo: "spicejetLogo.svg",
        arr: "3:05",
        dep: "5:15",
        price: "4580",
        no: "4"
    },
    {
        logo: "vistaraLogo.svg",
        arr: "1:05",
        dep: "3:15",
        price: "9356",
        no: "6"
    }
];
$(".loading-screen").hide();


$(document).ready(function() {
    var $bookBtn = $(".confirmBookingBtn"),
        $arrPlace = $(".input-from-arr"),
        $loadingScreen = $(".loading-screen"),
        $dateInput = $(".dateInput"),
        $adults = $(".adults"),
        $children = $(".children"),
        $flightDetailsForm = $(".flight-details"),
        $ticketContainer = $(".individual-flight-ticket-container"),
        $depPlace = $(".input-to-dep");
    let currBooking = {};

    async function saveTicketDataToDb(currBooking) {
        await $.post('saveTicketDataToDb', currBooking);
    }

    $bookBtn.each(function(e) {
        $(this).click(function(e) {
            const buttonNo = $(e.target)[0].classList[1];
            for(let i = 0; i < details.length; i++){
                if(buttonNo == details[i].no) {
                    currBooking = details[i];
                    console.log(currBooking);
                    $.extend(currBooking, {arrPlace: $arrPlace.attr('value'), depPlace: $depPlace.attr('value'), date: $dateInput.val(), adults: $adults.val(), children: $children.val()});
                    console.log(currBooking);
                    $loadingScreen.show();
                    saveTicketDataToDb(currBooking);
                    setInterval(() => {
                        $loadingScreen.hide();
                    }, 2500);
                    break;
                }
            }
        })
    });

    
})