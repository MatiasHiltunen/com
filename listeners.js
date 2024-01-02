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
