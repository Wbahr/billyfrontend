import React, { useContext } from 'react'
import Context from 'setup/context'

const DemandPermissionComponent = (props) => {

    const {
        permission,
        errorMessage,
        children
    } = props

    const context = useContext(Context)

    const {
        userInfo
    } = context || {}

    //Forces the 'children' component into an array.
    //It could be an array or an object depending on how many
    //child components are provided.
    const childComponentArray = (children || []).constructor.name == 'Array'
        ? [...children]
        : [children || {}]

    const isPermissionSatisfied = userInfo?.permissions.some(perm => perm === permission)
    
    return (
        <>
            {
                isPermissionSatisfied ? (
                    childComponentArray.map(c => c)
                ) : (
                    <>
                        {
                            errorMessage && <span>{errorMessage}</span>
                        }
                    </>
                )
            }
        </>
    )
}

export default DemandPermissionComponent