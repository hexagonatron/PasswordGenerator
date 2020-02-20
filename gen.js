var genPassword = () => {

    var charArray = [];
    
    if ($('input:checkbox:checked').length == 0){ //If nothing checked, do nothing, output empty
        $('#password-out')[0].value = "";
    } else {
        //Push relevant fns to array based on what's checked
        if ($("#upper-check")[0].checked) { charArray.push(genUpper); }
        if ($("#lower-check")[0].checked) { charArray.push(genLower); }
        if ($("#num-check")[0].checked) { charArray.push(genNum); }
        if ($("#symbol-check")[0].checked) { charArray.push(genSymb); }

        var password = "";

        //iterate through password length calling a random available fn each time and pushing output to password string
        for (i = 0 ; i < $('#len-slider')[0].value; i ++) {
            password += (charArray[Math.floor(Math.random() * charArray.length)]());
        }

        //pushing output to page
        $("#password-out")[0].value = password;

    }
}

//fns to gen a random upper, lower, symbol etc

var genUpper = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
}

var genLower = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26 + 97));
}

var genNum = () => {
    return String.fromCharCode(Math.floor(Math.random() * 10 + 48));
}

var genSymb = () => {
    const symb = "!@#$%^&*()-=+_?";
    return symb[Math.floor(Math.random() * symb.length )];
}

$(document).ready(() => {

    //gen password on page load
    genPassword();

    $('input.var').change(() => { //if any boxes ticked/unticked gen new password
        genPassword();
    })

    $('.len-group *').on("input", (e) => { //if slider changed, update text box and vice-versa. could be cleaner, should use ids rather than nex/prev element child
        if (e.currentTarget.nextElementSibling) {
            e.currentTarget.nextElementSibling.value = e.currentTarget.value;
        } else {
            e.currentTarget.previousElementSibling.value = e.currentTarget.value;
        }

        genPassword();
    })

    $('#refresh').on("click", (e) => { //Refresh password button
        genPassword();
    })

    $("#copy").on("click", (e) => { //copy toclipboard fn
        var copyText = $('#password-out')[0];
        copyText.select();
        copyText.setSelectionRange(0,999);

        document.execCommand("copy");
    })

});