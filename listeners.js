let clickListeners = []

export function setClickListener(extent, callback){

    clickListeners.push([extent, callback])
}

export function getClickListeners(){
    return clickListeners
}

export function clearListeners(){
    clickListeners = []
}
