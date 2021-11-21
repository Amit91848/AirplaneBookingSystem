$(".editModal-background").hide();

$(function() {
    var $userName = $(".name"),
        $addBtn = $(".editProfile"),
        $editBtn = $(".edit-btn"),
        $modalBackground = $(".editModal-background"),
        $modalCancelBtn = $(".cancelBtn"),
        $modalSaveBtn = $(".editSaveBtn"),
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

    $editBtn.click(openModal);

    $modalCancelBtn.click(closeModal);

    var name = $(".name").text();
    var arr = name.split(" ");
    var firstName = arr[0];
    var lastName = arr[1];
    $profilePhotoInitials.text(firstName.slice(0, 1) + lastName.slice(0, 1));
})