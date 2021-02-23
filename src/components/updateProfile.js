// import { Alert } from 'bootstrap'
import React, {useRef , useState} from 'react'
import {Card, Form, Button, Alert} from "react-bootstrap"
import {useAuth} from '../context//authContext'
import { Link, useHistory } from 'react-router-dom'

export default function UpdateProfile(){

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfrimRef = useRef()
    // const {signup , currentUser} = useAuth()
    const {currentUser, updateEmail, updatePassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()


    function handleSubmit(e){
        e.preventDefault()
        

        if(passwordRef.current.value !== passwordConfrimRef.current.value){
            return setError('Password do not matched')
        }





        const promises = []
        setLoading(true)
        setError('')
        if(emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }


        Promise.all(promises).then(() =>{
            history.push('/')
        }).catch(() =>{
            setError("Failed to update account")
        }).finally(() =>{
            setLoading(false)
        })

    }

    
    return(
        <>
         <Card>
             <Card.Body>
                 <h2 className="text-center mb-4">
                    Update Profile
                 </h2>
                 {/* {currentUser && currentUser.email} */}
                 {/* {currentUser.email} */}
                 {error &&  <Alert variant="danger">{error}</Alert>}
                 <Form onSubmit={handleSubmit}>
                     <Form.Group id ="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required  defaultValue={currentUser.email} /> 
                     </Form.Group>
                     <Form.Group id ="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef}  placeholder="Leave blank to keep the same" /> 
                     </Form.Group>
                     <Form.Group id ="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfrimRef}  placeholder="Leave blank to keep the same" /> 
                     </Form.Group>
                     <Button disabled={loading} className="w-100" type="submit">Update</Button>
                 </Form>
             </Card.Body>
             </Card> 
         <div className="w-100 text-center mt-2">
             <Link to='/'>Cancel</Link>
             </div>  
        </>
    )
}






// import React from 'react'


// export default function Signup(){
//     return(
//         <div>

//         </div>
//     )
// }