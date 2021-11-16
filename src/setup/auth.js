import { useContext } from 'react'
import Context from './context'

export default function Auth({ auth, history, roles, children }) {
    const context = useContext(Context)

    if (auth && !context.userInfo) {
        // If the user isnt signed in and the route required login, take them to the login page
        history.push(`/login?next=${history.location.pathname}`)
    } else if (context.userInfo && roles && !roles.includes(context.userInfo.role)){
        // If the user is signed in, the route has roles but the users role doesn't match
        history.push('/permission-denied')
    }
    
    return children
}