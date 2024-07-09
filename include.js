/*
 * CodeWeavers Web Test (JS Client Side)
 */

$(document).ready(function()
{
    $('input[name=rdate]').val(new Date().toDateInputValue());

    $("form[name=erForm]").find(':input').focus(function(){
        $(this).removeClass('is-invalid');
    });

    $("form[name=erForm]").submit(function(e)
    {
        e.preventDefault();

        var $this = this;
        var err = false;
        var flds = {};
        var formData = new FormData();

        $(this).prop('disabled', true);
        $(this).addClass('btn-disabled');
        $("#erError").hide();
        $("#erError").hide();
        $(this).find(':input').removeClass('is-invalid');

        $(this).find(':input').each(function(x,f){
            if ($(this).prop('required') && !$(f).val()) {
                err = true;
                $(this).addClass("is-invalid");
                return true;
            }
            if (!$(this).attr('name'))
                return true;
            flds[$(f).attr("name")] = $(f).val();
            formData.append($(this).attr('name'), $(this).val());
        });

        if (err) {
            $("#erError").removeClass("d-none").show();
            $(this).prop('disabled', false);
            $(this).removeClass('btn-disabled');
            return false;
        }

        pleaseWait.show();

        $.ajax({
            url: "sabmit.php",
            type: 'POST',
            enctype: 'multipart/form-data',
            data: formData,
            success: function(ret, textStatus)
            {
                pleaseWait.hide();
                if (ret == "OK") {
                    $($this).hide();
                    $("#errDone").removeClass("d-none").show();
                    return;
                }
                $("#erError div.return-html").html(ret);
                $("#erError").removeClass("d-none").show();
            },
            error: function(data)
            {
                pleaseWait.hide();
                alert(JSON.stringify(data));
            },
            cache: false,
            contentType: false,
            processData: false,
            dataType: "json"
        });

    });
});

var pleaseWait;
pleaseWait = pleaseWait || (function () {
    var pleaseWaitDiv = $('<div class="modal fade" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-body text-center"><h1><i class="fas fa-spinner fa-pulse"></i> Please Wait...</h1></div></div></div></div>');
    return {
        show: function() {
            pleaseWaitDiv.modal();
        },
        hide: function () {
            pleaseWaitDiv.modal('hide');
            $(pleaseWaitDiv).remove();
            $("body").find(".modal-backdrop").remove();
        }
    };
})();

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});
