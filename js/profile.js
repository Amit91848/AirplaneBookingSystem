$(".editModal-background").hide();

$(function() {
    var $userName = $(".name"),
        $addBtn = $(".editProfile"),
        $editBtn = $(".edit-btn"),
        $modalBackground = $(".editModal-background"),
        $modalCancelBtn = $(".cancelBtn"),
        $modalSaveBtn = $(".editSaveBtn"),
        $modalNameInput = $(".modal-name-input"),
        $modalBirthdayInput = $(".modal-birthday-input"),
        $modalGenderInput = $(".modal-input-gender"),
        $modalMaritalStatusInput = $(".modal-input-marital-status"),
        $oldPassword = $(".oldPasswordInput"),
        $newPassword = $(".newPasswordInput"),
        $confirmPassword = $(".confirmPasswordInput"),
        $passwordSaveBtn = $(".passwordSaveBtn"),
        $forgotPassword = $(".forgotPassword"),
        $profileEditForm = $(".profileEditModal"),
        $passwordEditForm = $(".passwordEditModal"),
        $leftSecContainer = $(".leftSecContainer"),
        $profileBtn = $(".menu-profile"),
        $loginBtn = $(".menu-login-details"),
        $ticketsBtn = $(".menu-tickets"),
        $profileDetailsCard = $(".profile-details-container"),
        $loginDetailsCard = $(".login-details-container"),
        $ticketsDetailsCard = $(".tickets-container"),
        $menuBtn = $(".menu-btn"),
        $profilePhotoInitials = $(".profileP");

    // Functions

    // Modal Functions
    function openModal() {
        $modalBackground.show();
    }

    function closeModal() {
        $modalBackground.hide();
    }

    function menuBtnNormal() {
        $menuBtn.each(function (e) {
            $(this).removeClass('menuSelected');
        })
    }

    // EventListeners

    // ModalEvenetListeners
    $addBtn.each(function (e) {
        $(this).click(function () {
            openModal();
            $profileEditForm.show();
            $passwordEditForm.hide();
        })
    });

    $editBtn.click(() => {
        openModal();
        $profileEditForm.show();
        $passwordEditForm.hide();
    });

    $forgotPassword.click(() => {
        openModal();
        $profileEditForm.hide();
        $passwordEditForm.show();
    })

    $modalCancelBtn.click(closeModal);

    $(window).scroll(() => {
        // Sticky left section

        if($(this).scrollTop() > $leftSecContainer.offset().top - 60){
            $leftSecContainer.addClass('fixed');
        } else {
            $leftSecContainer.removeClass('fixed');
        }

        // Menu color change

        if($(this).scrollTop() > $profileDetailsCard.offset().top + 20) {
            menuBtnNormal();
            console.log("Time to make profle Btn shine");
            $loginBtn.addClass('menuSelected');
        } else {
            menuBtnNormal();
            $profileBtn.addClass('menuSelected');
        }

        if($(this).scrollTop() > $loginDetailsCard.offset().top + 20) {
            menuBtnNormal();
            $ticketsBtn.addClass('menuSelected');
        } else {
            menuBtnNormal();
            $loginBtn.addClass('menuSelected');
        }
    })


    // Save Button to update profile data
    $modalSaveBtn.click(function (e) {
        let bodyObj = {
            name: $modalNameInput.val(),
            birthDay: $modalBirthdayInput.val(),
            Gender: $modalGenderInput.val(),
            maritalStatus: $modalMaritalStatusInput.val(),
        }
        $.post("updateProfile", bodyObj);
        closeModal();
        location.reload(true);
    });

    // Save Button To Update Password
    $passwordSaveBtn.click(function (e) {
        let passwordObj = {
            oldPassword: $oldPassword.val(),
            newPassword: $newPassword.val(),
            confirmPassword: $confirmPassword.val(),
        };

        $.post("updatePassword", passwordObj);
        closeModal();
    });

    var name = $(".name").text();
    var arr = name.split(" ");
    var firstName = arr[0];
    var lastName = arr[1];
    $profilePhotoInitials.text(firstName.slice(0, 1) + lastName.slice(0, 1));
})