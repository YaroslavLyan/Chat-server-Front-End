import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { sendMessage } from '../../api/ws';
import { sms } from '../../reducers/reducer';
import MessagerListItem from './messager-list-item';

import './modal-win.css'

const ChatModal = ({props}) => {
    
    const dispatch = useDispatch();

    const arhivMessages = useSelector((state) => state.sms.messagesSMS);
    const filtrMsg = arhivMessages?.filter(el => (el.from === props.id || el.to === props.id))

    const user = useSelector((state) => state.auth.userAuth);
    const [message, setMessage] = useState();

    //validate input and save message
    const onValueChange = (e) => {
        setMessage(e.target.value.replace(/[^\.\-]/g, ''))
    }

    //send message
    const handleClick = () => {
        const sendSMS = {
            status: "message",
            from: user.id,
            fname: user.name,
            to: props.id,
            tname: props.name,
            message: message
        }
        sendMessage(sendSMS)
        dispatch(sms(sendSMS))
        setMessage('')
    };


    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        e.preventDefault()
        setShow(true)
    };

    
    const elements = filtrMsg?.map(item => {
        return (
            <MessagerListItem key={uuidv4()} {...item}/>
        )    
    })

    return (
        <>
            <div className='show-btm vertikal-menu'>     
                <Button variant="primary" onClick={handleShow} >
                    <i className="fa-brands fa-rocketchat"></i>
                </Button>
            </div>


        <Modal show={show} onHide={handleClose} size="lg">
            
            <Modal.Header closeButton>
                <Modal.Title>Чат с: {props.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='det-message'>
                    {elements}
                </div>   
                <div className='post-message'>
                    <textarea type='text' id="description" name="description" 
                        className='input-title' onChange={onValueChange}
                        value={message}>
                    </textarea>
                </div>   
            </Modal.Body>
            <Modal.Footer>
                <Button type='submit' variant="primary" className='del-order' onClick={handleClick}>
                    Отправить
                </Button>
            </Modal.Footer>

        </Modal>
         
        </>
    )
}

export default ChatModal;