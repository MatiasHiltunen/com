
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

export function logger(...args){

    console.log(args)

    logData.unshift(...args)   

    logElement.innerHTML = '<div style="background-color: #fff;">' + logData.map((log)=> {
        return `<p>${JSON.stringify(log)} </p>`
    }).join('') + "</div>"

}