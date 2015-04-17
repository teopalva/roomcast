

var AnimationMixin = {

    flipY: function(node, startDeg, endDeg) {
        var self = this;

        this.ny = startDeg;

        if(this.rotYINT) {
            clearInterval(this.rotYINT);
        }
        function rotate() {
            self.startYRotate(node, startDeg, endDeg);
        }
        this.rotYINT = setInterval(rotate, 4);

    },

    startYRotate: function(node, startDeg, endDeg) {
        this.ny += 5;
        node.style.transform="rotateY(" + this.ny + "deg)";
        node.style.webkitTransform="rotateY(" + this.ny + "deg)";
        node.style.OTransform="rotateY(" + this.ny + "deg)";
        node.style.MozTransform="rotateY(" + this.ny + "deg)";
        if (this.ny === endDeg) {
            clearInterval(this.rotYINT);
           // if (this.ny >= 360) this.ny = 0;
        }
    }

};

module.exports = AnimationMixin;
