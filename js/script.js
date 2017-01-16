$(document).ready(function() {
    "use strict";

    var mailEncoded = "bWFpbEBjaHJpc3RpYW4tcGFmZmhhdXNlbi5kZQ=="

    $('#mail').on('click', function(event) {
        event.preventDefault();
        location = "mailto:" + window.atob(mailEncoded);
    });
});
