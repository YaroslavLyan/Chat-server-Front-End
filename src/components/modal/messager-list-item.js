import { useSelector } from 'react-redux';

import './modal-win.css';

const MessagerListItem = (props) => {
    const user = useSelector((state) => state.auth.userAuth);

    return (
        <div className={props.from === user.id ? 'my-message' : 'other-message'}>
            <div>{props.from === user.id ? user.name : props.fname}</div>
            <div className='bloc-messag'>{props.message}</div>
        </div>
    )    
    
}

export default MessagerListItem;