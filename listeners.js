let clickListeners = []

export function setClickListener(id, size, callback){
    clickListeners.push([id, size, callback])
}

export function removeClickListener(id){
    clickListeners = clickListeners.filter(([_id])=> _id !== id)
}

export function getClickListeners(){
    return clickListeners
}

export function clearListeners(){
    clickListeners = []
}
