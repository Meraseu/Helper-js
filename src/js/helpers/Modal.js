'use strict';

export default function(element) {
    const attached = () => {
        if(!element) {
            return;
        }
        element.classList.add('attached');
        element.setAttribute('aria-hidden', 'false');
    }
    const detached = () => {
        if(!element) {
            return;
        }
        element.classList.remove('attached');
        element.classList.add('detached');
        setTimeout(() => {
            element.classList.remove('detached');
        }, 300);
        element.setAttribute('aria-hidden', 'true');
    }
    return {
        attached: attached,
        detached: detached
    }
}

// export default {
//     attached: function(element) {
//         if(!element) {
//             return;
//         }
//         helpers.addClass(element, 'attached');
//         element.setAttribute('aria-hidden', 'false');
//     },
//     detached: function(element) {
//         if(!element) {
//             return;
//         }
//         helpers.removeClass(element, 'attached');
//         element.setAttribute('aria-hidden', 'true');
//     }
// }