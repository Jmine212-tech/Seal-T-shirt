import toast from "react-hot-toast"
import {userDB} from "../lib/users"
import { useProfileStore } from "../store/useProfileStore"

interface User {
    id: string
    name: string
    email: string
    password: string
    role: string
}

export class useUserService {
    #setUser = useProfileStore(state => state.setUser)
    

    register(info: {name: string, email: string, password: string}){
        const isExisting = userDB.find((f) => f.email === info.email)
        if(isExisting) {
            toast.error('this email already exist')
            throw new Error("this email already exist")
        } 
        userDB.push({...info, role: "user"})
    }
    login(email: string, password: string){
        const isExisting = userDB.find((f) => f.email === email)
        if(!isExisting) throw new Error("user not found")

        const isMatch = isExisting?.password === password
        if(!isMatch) throw new Error("wrong password")

        this.#setUser({
            id: isExisting.id,
            name: isExisting.name,
            email: isExisting.email,
            role: isExisting.role
        })
        toast.success("login success")          
    }
    logout(){
        this.#setUser(null)
    }
    
}