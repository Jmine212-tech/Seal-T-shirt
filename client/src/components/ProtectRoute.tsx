import { useEffect } from 'react'
import { useProfileStore } from '../store/useProfileStore'
import { Outlet, useNavigate } from 'react-router-dom'

function ProtectRoute({allowedRole = []}: {allowedRole: string[]}) {
    const user = useProfileStore(state => state.user)
    const navigate = useNavigate()
    
    useEffect(() => {
        const fetch = () => {
            if(allowedRole.length > 0 && !allowedRole.includes(user?.role)){
                navigate('/', {replace: true})
                console.error('U are not allowed')
            }
        }
        fetch()
    }, [])

    return <Outlet />
}

export default ProtectRoute
