'use strict';

var helpers = require('./Core');

module.exports = {
    getNaturalSize: function(image) {
        return  {
            'width': image.naturalWidth,
            'height': image.naturalHeight,
        }
    },
    getResizeCalculator: function(image, maxWidth, maxHeight) {
        var ratio = 0,
            size = this.getNaturalSize(image),
            width = size.width,
            height = size.height,
            type = (width > height) ? 'width' : 'height',
            isresize = false;
        if(type == 'width') {
            if(width > maxWidth) {
                ratio = maxWidth / width;
                width = Math.round(width * ratio);
                height = Math.round(height * ratio);
                isresize = true;
            }
            return {
                'type': type,
                'isresize': isresize,
                'width': width,
                'height': height
            }
        } else {
            if(height > maxHeight) {
                ratio = maxHeight / height;
                width = Math.round(width * ratio);
                height = maxHeight;
                isresize = true;
            }
            return {
                'type': type,
                'isresize': isresize,
                'width': width,
                'height': height
            }
        }
    }
}