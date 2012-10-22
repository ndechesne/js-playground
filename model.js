

var count = 0;
var x0, y0;
var moved_sq=null;
var kill = false;

function sq_up (event) {
    document.onmousemove = null;
    document.onmouseup = null;
    moved_sq = null;
}

//TODO: document.body.scrollLeft, document.body.scrollTop
function sq_move(event) {

    var left = parseInt(moved_sq.style.left.replace('px', ''), 10);
    var top  = parseInt(moved_sq.style.top.replace('px', ''), 10);
    moved_sq.style.left = left + event.clientX - x0;
    moved_sq.style.top = top + event.clientY - y0;
    x0 = event.clientX;
    y0 = event.clientY;
}

function sq_down (event) {

    if (kill) {
        this.parentNode.removeChild(this);
        kill = false;
    }
    else {
        x0 = event.clientX;
        y0 = event.clientY;

        moved_sq = this;
        document.onmousemove = sq_move;
        document.onmouseup = sq_up;
    }

    return false;
}

function bt_add () {
    // clear any pending 'remove' action
    kill = false;

    var sq_model = document.getElementById("sq_model");
    var sq_new = sq_model.cloneNode(true);
    sq_new.style.display = "block";
    sq_new.id = count++;
    sq_new.style.left = "120px"; //sq_model.style.left;
    sq_new.style.top = "120px";//sq_model.style.top;
    sq_new.onmousedown = sq_down;
    sq_model.parentNode.appendChild(sq_new);
}

function bt_rm () {
    kill = true;
}

function bt_clear () {
    // clear any pending 'remove' action
    kill = false;

    var sqs = document.getElementsByClassName('sq');
    var i = sqs.length;
    //do not delete sq_model, we are lucky..
    //... it's always sqs[0]
    while(i-- > 1) {
        document.body.removeChild(sqs[i])
    }
}

window.onload = function () {

    document.getElementById("bt_add").onclick = bt_add;
    document.getElementById("bt_rm").onclick = bt_rm;
    document.getElementById("bt_clear").onclick = bt_clear;

}

