

var count = 0;
var x0, y0;
var moved_sq=null;
var kill = false;

function sq_up (event) {
    this.onmousemove = null;
    this.onmouseup = null;
    //moved_sq = null;
}


//TODO: document.body.scrollLeft, document.body.scrollTop
function sq_move(event) {

    var left = parseInt(this.style.left.replace('px', ''), 10);
    var top  = parseInt(this.style.top.replace('px', ''), 10);
    this.style.left = left + event.clientX - x0;
    this.style.top = top + event.clientY - y0;
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
        
        //moved_sq = this;
        this.onmousemove = sq_move;
        this.onmouseup = sq_up;
    }
    
    return false;
}

function bt_add () {
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

window.onload = function () {

    document.getElementById("bt_add").onclick = bt_add;
    document.getElementById("bt_rm").onclick = bt_rm;

}

