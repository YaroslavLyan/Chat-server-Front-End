import { useSelector } from 'react-redux';

import ChatModal from '../modal/chat-modal';

import './users-list.css';

const UserListItem = (props) => {
    const message = useSelector((state) => state.sms.messagesSMS);

    
    const {id, name} = props;
    const col = (message?.filter(el => el.from === id)).length;
    return (
        <tr>
            <td>{id}</td>
            <td>{name} <div className={(col > 0)? 'col-message' : 'display-none'}>{col}</div></td>
            <td><ChatModal props={props}/></td>
            
        </tr>
    )    
    
}

export default UserListItem;