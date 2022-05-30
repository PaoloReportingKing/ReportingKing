function confirmationpopup(val, param) {
    $.fn.cornerpopup({
        variant: 10,
        content: `<div class="row"><div class="col-sm-4"><img src="/assets/images/img/alert.png" /></div ><div class="col-sm-8"><h4 class="col-sm-12 pl-0" stylle="rgb(255, 205, 0);font-weight:600">Warning</h4><p class="col-sm-12 pl-0">` + val + `</p><div class="row"><div class="col-sm-12"><div class="row"><div class="col-sm-6 "><button onClick="setValue(true, ` + param + `)" class="btn btn-outline-primary active"style="display:block;width:100%;">Ok</button></div><div class="col-sm-6 "> <button onClick="setValue(false, ` + param + `)" class="btn btn-danger" style="display: block;width:100%;">Cancel</button></div></div></div> </div></div></div></div >`,
        topCorner: 1,
        closeBtn: 0,
        bgColor: '#fff',
        borderColor: '#ffff99',
        padding: '0px !important',
        colors: 'rgb(255, 205, 0);',
        btnTextColor: '#fff',
    });
}

function setValue(val, param) {
    $.fn.cornerpopup.popupClose();
    if (val) {
        OKBtn(param);
    }
}

function confirmationpopup2(val, param) {
    $.fn.cornerpopup({
        variant: 10,
        content: `<div class="row"><div class="col-sm-4"><img src="/app-assets/images/img/alert.png" /></div ><div class="col-sm-8"><h4 class="col-sm-12 pl-0" stylle="rgb(255, 205, 0);font-weight:600">Warning</h4><p class="col-sm-12 pl-0">` + val + `</p><div class="row"><div class="col-sm-12"><div class="row"><div class="col-sm-6 "><button onClick="setValue2(true, ` + param + `)" class="btn btn-outline-primary active"style="display:block;width:100%;">Ok</button></div><div class="col-sm-6 "> <button onClick="setValue2(false, ` + param + `)" class="btn btn-danger" style="display: block;width:100%;">Cancel</button></div></div></div> </div></div></div></div >`,
        topCorner: 1,
        closeBtn: 0,
        bgColor: '#fff',
        borderColor: '#ffff99',
        padding: '0px !important',
        colors: 'rgb(255, 205, 0);',
        btnTextColor: '#fff',
    });
}

function setValue2(val, param) {
    $.fn.cornerpopup.popupClose();
    if (val) {
        OKBtn2(param);
    }
}

function popupShow(val, type) {
    if (type === 'error' || type === 'fail' || type === 'bad') {
        $.fn.cornerpopup({

            variant: 10,
            content: `<div class="row pt-1"><div class="col-sm-4"><img class="pull-right" src="/assets/images/img/error.png" /></div ><div class="col-sm-8 pt-1"><h4 class="col-sm-12 pl-0" stylle="rgb(255, 205, 0);font-weight:600">Error</h4><p class="col-sm-12 pl-0">` + val + `</p></div></div></div >`,
            topCorner: 2,
            bgColor: '#fff',
            borderColor: '#f44336',
            padding: '0px',
            colors: '#f44336',
            closeBtn: 0,
            btnTextColor: '#fff',
            timeOut: 3000
        });
    }
    else if (type === 'good' || type === 'success') {
        $.fn.cornerpopup({
            variant: 10,
            content: `<div class="row pt-1"><div class="col-sm-4"><img class="pull-right" src="/assets/images/img/success.png" /></div ><div class="col-sm-8 pt-1"><h4 class="col-sm-12 pl-0" stylle="rgb(255, 205, 0);font-weight:600">Success</h4><p class="col-sm-12 pl-0">` + val+`</p></div></div></div >`,
            topCorner: 2,
            bgColor: '#fff',
            borderColor: '#2ecc71',
            padding: '0px',
            colors: '#4caf50',
            btnTextColor: '#fff',
            closeBtn: 0,
            timeOut: 3000
        });
    }
    else if (type === 'warning' || type === 'warn') {
        $.fn.cornerpopup({
            variant: 10,
            content: `<div class="row pt-1"><div class="col-sm-4"><img class="pull-right" src="/assets/images/img/alert.png" /></div ><div class="col-sm-8 pt-1"><h4 class="col-sm-12 pl-0" stylle="rgb(255, 205, 0);font-weight:600">Warning</h4><p class="col-sm-12 pl-0">` + val + `</p></div></div></div >`,
            topCorner: 2,
            bgColor: '#fff',
            borderColor: '#ffff99',
            padding: '0px',
            colors: '#ffff99',
            closeBtn: 0,
            btnTextColor: '#fff',
            timeOut: 3000
        });
    }
}