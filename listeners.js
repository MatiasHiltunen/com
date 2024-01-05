let clickListeners = {}

export function setClickListener(id, size, callback) {

    clickListeners[id] = [size, callback]
}

export function removeClickListener(id) {
    clickListeners = Object.fromEntries(Object.entries(clickListeners).filter(([_id]) => _id !== id))
}

export function getClickListeners() {
    return clickListeners
}

export function clearListeners() {
    clickListeners = {}
}



let hoverListeners = {}

export function setHoverListener(id, size, callback) {

    hoverListeners[id] = [size, callback]
}

export function removeHoverListener(id) {
    hoverListeners = Object.fromEntries(Object.entries(hoverListeners).filter(([_id]) => _id !== id))
}

export function getHoverListeners() {
    return hoverListeners
}

export function clearHoverListeners() {
    hoverListeners = {}
}

