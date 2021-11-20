$(".modal-container").hide();
$(".signup-form").hide();
$(".signup-form-button").css("background", "lightgrey");
$(".modal-background").hide();

$(function(){
    var $login_form = $(".login-form"),
        $signup_form = $(".signup-form"),
        $modal = $(".modal-container"),
        $login_signup_btn = $(".login-signup"),
        $login_form = $(".login-form"),
        $signup_form = $(".signup-form")
        $login_form_btn = $(".login-form-button"),
        $modal_background = $(".modal-background"),
        $logoutBtn = $(".logout"),
        $signup_form_btn = $(".signup-form-button");

        
        function openModal() {
            $modal.show();
            $modal.addClass("open");
            $modal_background.show();
        }

        function closeModal() {
            $modal.hide();
            $modal.removeClass("open");
            $modal_background.hide();
        }

        $login_signup_btn.click(openModal);
        $(window).keydown(function(e) {
            console.log(e.keyCode);
            if(e.keyCode == 27){
                closeModal();
            }
        });

        $login_form_btn.click(function(e) {
            $signup_form.hide();
            $login_form.show();
            $signup_form_btn.css("background", "lightgrey");
            $login_form_btn.css("background", "white");
        })

        $signup_form_btn.click(function(e) {
            $signup_form.show();
            $login_form.hide();
            $login_form_btn.css("background", "lightgrey");
            $signup_form_btn.css("background", "white");
        })

        $logoutBtn.click(function(e) {
            $.get('/logout');
        })
});