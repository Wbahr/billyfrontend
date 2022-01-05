import { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router'
import Context from './context'

export default function Auth({ auth, roles, children }) {
    const navigate = useNavigate()
    const location = useLocation()
    const context = useContext(Context)

    if (auth && !context.userInfo) {
        // If the user isnt signed in and the route required login, take them to the login page
        navigate(`/login?next=${location.pathname}`)
    } else if (context.userInfo && roles && !roles.includes(context.userInfo.role)){
        // If the user is signed in, the route has roles but the users role doesn't match
        navigate('/permission-denied')
    }
    
    return children
}