import { App } from "../componentBase.js"
import { text } from "../componentTypes.js"
import { RelativeSize, Size, column} from "../size.js"
import { Box } from "./components/box.js"
import { Text } from "./components/text.js"

export default new App({
    context: {
        count: 0
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
                    onClick(){
                        this.children.reverse()
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
                    size: new Size({width: 60, height: 80}),
                    fill: "red",
                    onClick(){

                        this.context.count++
                        
                        if(this.context.count % 2 === 0){
                            this.size.update({width: 80, height:60})
                        } else {
                            this.size.update({width: 60, height:80})
                        }
                    
                   

                    },
                    children: [
                        new Text({text: "test", color: "black"})
                    ]
                   
                }),
                
            ]
        }),
       
        ]
    
})