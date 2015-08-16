(function() {
    $document = $(document);
    $document.ready(function() {
        "use strict";

        // variables
        var captchaResult = 8;
        var sendButtonIcon = 'fa fa-paper-plane';
        var sendButtonIconSending = 'fa fa-spinner fa-pulse';

        var $cancelButton = $('#cancelButton');
        var $captcha = $('#captcha');
        var $captchaFunction = $('#captchaFunction');
        var $email = $('#email');
        var $errorCaptcha = $('#errorCaptcha');
        var $errorMessage = $('#errorMessage');
        var $errorEmail = $('#errorEmail');
        var $errorName = $('#errorName');
        var $mailButton = $('#mailButton');
        var $mailWrapper = $('#mailWrapper');
        var $mailWrapperError = $('#errorMailWrapper');
        var $message = $('#message');
        var $name = $('#name');
        var $overlay = $('.overlay');
        var $sendButton = $('#sendButton');
        var $sendButtonI = $sendButton.children("i");
        var $successMail = $('#successMail');

        //functons
        function calcCaptcha() {
            var number1 = Math.floor( Math.random() * 10 );
            var number2 = Math.floor( Math.random() * 10 );
            captchaResult = parseInt( number2 ) + parseInt( number1 );
            $captchaFunction.text(number1 + " + " + number2 + " = ?");
        }

        function sendFailure() {
            calcCaptcha();
            $sendButtonI.removeClass(sendButtonIconSending);
            $sendButtonI.addClass(sendButtonIcon);
            $sendButton.on('click', prepareMail);
            $cancelButton.show();
            $document.on('keyup', reset);
            $overlay.on('click', reset);
            $mailWrapperError.slideDown(200).delay(3000).slideUp(200);
        }

        function sendResponse(data) {
            var response = jQuery.parseJSON(data);
            var sendSuccess = response.success;
            if(sendSuccess === true) {
                reset();
                $successMail.slideDown(200).delay(3000).slideUp(200)
            } else {
                sendFailure();
            }
        }

        function prepareMail() {
            var tAbort = false;

            var tMessage = $message.val();
            if(tMessage === "") {
                $errorMessage.text("Your message is required!");
                $errorMessage.slideDown(200).delay(3000).slideUp(200);
                tAbort = true;
            } else if (tMessage.length >= 1000) {
                var charsOver = tMessage.length - 1000;
                $errorMessage.text("Your message is too long! +" + charsOver);
                $errorMessage.slideDown(200).delay(3000).slideUp(200);
                tAbort = true;
            }

            var tMail = $email.val();
            if(tMail === "") {
                $errorEmail.text("Your E-Mail is required!");
                $errorEmail.slideDown(200).delay(3000).slideUp(200);
                tAbort = true;
            } else if (validateEmail(tMail) === false) {
                $errorEmail.text("No valid E-Mail address!");
                $errorEmail.slideDown(200).delay(3000).slideUp(200);
                tAbort = true;
            }

            var tName = $name.val();
            if(tName === "") {
                $errorName.text("Your name is required!");
                $errorName.slideDown(200).delay(3000).slideUp(200);
                tAbort = true;
            }

            var tHumanResult = $captcha.val();
            if(tHumanResult === "") {
                $errorCaptcha.text("Captcha result is required!");
                $errorCaptcha.slideDown(200).delay(3000).slideUp(200);
                tAbort = true;
            } else if(captchaResult !== parseInt(tHumanResult)) {
                $errorCaptcha.text("Captcha result wrong!")
                $errorCaptcha.slideDown(200).delay(3000).slideUp(200);
                tAbort = true;
            }

            if(tAbort === true) {
                calcCaptcha();
                return;
            }

            var data = {
                name: tName,
                mail: tMail,
                message: tMessage
            }
            $sendButton.off('click');
            $overlay.off('click');
            $document.off('keyup');
            $cancelButton.hide();
            $sendButtonI.removeClass(sendButtonIcon);
            $sendButtonI.addClass(sendButtonIconSending);
            $.post("cgi/sendmail.php", data, sendResponse).fail(sendFailure);
        }

        function reset() {
            $sendButtonI.removeClass(sendButtonIconSending);
            $sendButtonI.addClass(sendButtonIcon);
            $document.off('keyup');
            $cancelButton.show();
            $mailWrapper.hide();
            $overlay.hide();
            $errorMessage.text("");
            $errorEmail.text("");
            $errorName.text("");
            $errorCaptcha.text("");
            $message.val("");
            $email.val("");
            $name.val("");
            $captcha.val("");
        }

        function validateEmail(email) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
        }

        // main
        $mailButton.on('click', function() {
            $cancelButton.on('click', function() {
                reset();
            });
            $sendButton.on('click', prepareMail);
            $overlay.on('click', reset);
            $overlay.show();
            $mailWrapper.show();
            calcCaptcha();
            $document.on('keyup', function(event) {
                if(event.keyCode === 27) {
                    reset();
                }
            });
        });
    })
})();
