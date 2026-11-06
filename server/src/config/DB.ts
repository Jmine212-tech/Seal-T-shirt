import mongoose from "mongoose"

export const connectedDB = async (url: string | undefined) => {
    if(!url || url == undefined) return console.log(`[MONGODB] _URL_ undefined`)
    try{
        mongoose.connect(url)
        console.log(`[MONGODB] connected`)
    }catch(err){
        console.log(`[MONGODB]`, err)
    }
}