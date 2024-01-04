import { Component } from "../componentBase.js"
import { app, box, text } from "../componentTypes.js"
import { logger } from "../log.js"
import { RelativeSize, Size, alignCenter, alignStart, column, getScreenSize, row } from "../size.js"
import { Box } from "./components/box.js"

class App extends Component {

    constructor({ children, onUpdate}){
        super(app)

        this.children = children
        this.onUpdate = onUpdate
        this.update()
        
    }

    onUpdate(){}

    update(){
        const {size} = this.onUpdate()

        this.context.screen = size
        this.size = size
        this.parentSize = size
        this.build()
    }

}


export default new App({
    onUpdate: ()=> {
        return {
            size: new Size({
                width: window.innerWidth,
                height: window.innerHeight,

            })
        }
    },
    children: [

     
        new Box({
            size: new RelativeSize(0.8,0.7, {
                direction: column
            }),
           
            children:[
                new Box({
                    size: new Size({width: 100, height: 100}),
                    fill: "blue",
                    onClick: (current)=>{
                        current.children.reverse()
                    },
                    children: [
                        new Box({
                            size: new Size({width: 20, height: 20}),
                            fill: "red"
                
                        }),
                        new Box({
                            size: new Size({width: 20, height: 20}),
                            fill: "green"
                
                        })
                    ]
                }),
                new Box({
                    size: new Size({width: 20, height: 20}),
                    fill: "red",
                    onClick: (current)=>{
                        if(current.size.relative){
                            current.size = new Size({width: 20, height:20})
                        } else {
                            current.size = new RelativeSize(0.5,0.03)
                        }

                    },
                }),
                
            ]
        }),
       
        ]
    
})
/*
export const app2 = new App({
    size: getScreenSize(),
    children: [
        new Box({
            setSize: () => new Size({
                width: 300,
                height: 500,
                alingOnAxisY: alignCenter,
            }),
            children: [
                new Box({
                    state: {
                        count: 0
                    },
                    border: 3,
                    color: 'red',
                    fill: 'grey',
                    setSize: () => new Size({
                        width: 100,
                        height: 40
                    }),
                    onClick(current) {
                        current.state.count++
                        current.children[0].text = 'count: ' + current.state.count
                        current.fill = current.state.count % 2 === 0 ? 'blue' : 'green'
                    },
                    onHover(isHovering, current){

                        if(isHovering){

                            current.fill = 'red'
                        } else {
                            current.fill = 'grey'
                        }
                    },
                    children: [
                        {
                            type: text,
                            text: 'count',
                            fontSize: 12
                        }
                    ]
                }),
                new Box({
                    state: {
                        count: 0
                    },
                    border: 3,
                    color: 'red',
                    fill: 'grey',
                    setSize: () => new Size({
                        width: 100,
                        height: 40
                    }),
                    onClick(current) {
                        current.state.count++
                        current.fill = 'blue'
                        logger(current.state.count)
                    },
                    children: [
                        {
                            type: text,
                            text: 'Nappi',
                            fontSize: 12
                        }
                    ]
                }),
                new Box({
                    border: 3,
                    color: 'red',
                    fill: 'grey',
                    setSize: () => new Size({
                        width: 100,
                        height: 40,
                    }),
                    onClick(current) {
                        
                        alert("Hello")
                    },
                    children: [
                        {
                            type: text,
                            text: 'alert',
                            fontSize: 12
                        }
                    ]
                }),
            ]
        }),
        
    
    ]
})

*/