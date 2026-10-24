import express from 'express'
import morgan from 'morgan'

export default function createApp(){
    let app = express()

    app.use(express.json())
    app.use(morgan('dev'))


    
    return app
}

