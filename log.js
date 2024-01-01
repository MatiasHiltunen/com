import { logSettings } from "./config.js"

export function createLogger(settings){
    
    if(!settings || !settings.length) return ()=>{}
    
    const logData = []
    const logElement = document.createElement('div')
    const showLogButton = document.createElement('button')
    let logVisible = true
    
    showLogButton.addEventListener('click',()=>{
        logVisible = !logVisible
        logElement.style.display = logVisible ? 'block' : 'none'
    })
    
    showLogButton.innerText = "log"
    
    showLogButton.style.cssText = `
        position: fixed;
        bottom: 1em;
        right: 1em;
    `
    
    logElement.style.cssText = `
    
        display: flex;
        flex-direction: column;
        background-color: #eee;
        position: fixed;
        bottom: 1em;
        width: 100%;
        height: 100px;
        border-top: dashed 1px blue;
        overflow: auto;
        font-size: 0.5em;
        gap: 4px;
        `
    document.body.append(logElement, showLogButton)

    return function logger(...args){
    
        console.log(args)
    
        logData.unshift(...args)   
    
        logElement.innerHTML += '<div style="background-color: #fff;">' + args.map((log)=> {
            return `<p>${JSON.stringify({log})} </p>`
        }).join('') + "</div>"
    
    }
}

export function createFpsCounter(){
    const times = [];
    let fps;
    let enabled = true

    function refreshLoop() {
        if(!enabled) return

        window.requestAnimationFrame(() => {
            const now = performance.now();
            
            while (times.length > 0 && times[0] <= now - 1000) {
                times.shift();
            }

            times.push(now);
            fps = times.length;
            
            refreshLoop();
        });
    }

    refreshLoop();

    function showFps(){
        logger("fps", fps)
    }

    const id = setInterval(showFps, 1000)

    function dispose(){
        clearInterval(id)
        enabled = false
    }

    return dispose
}

export const logger = createLogger(logSettings)
