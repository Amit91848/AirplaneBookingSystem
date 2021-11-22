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
        $profilePhotoInitials = $(".profileP");

    // Functions

    // Modal Functions
    function openModal() {
        $modalBackground.show();
    }

    function closeModal() {
        $modalBackground.hide();
    }

    // EventListeners

    // ModalEvenetListeners
    $addBtn.each(function (e) {
        $(this).click(function () {
            openModal();
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