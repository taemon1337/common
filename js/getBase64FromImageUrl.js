function getBase64FromImageUrl(url, cb) {
    var img = new Image();

    img.setAttribute('crossOrigin', 'anonymous');

    img.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width =this.width;
        canvas.height =this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        var url= dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
        cb(url);
    };
    img.src = url;
}
