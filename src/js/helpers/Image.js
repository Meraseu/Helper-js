'use strict';

export default {
    getNaturalSize(image) {
        return {
            'width': image.naturalWidth,
            'height': image.naturalHeight,
        }
    },
    getResizeCalculator(image, maxWidth, maxHeight) {
        const size = this.getNaturalSize(image);
        let ratio = 0;
        let width = size.width;
        let height = size.height;
        const type = (width > height) ? 'width' : 'height';
        let isresize = false;
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