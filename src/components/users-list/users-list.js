import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import '../../api/ws';
import { sendMessage } from '../../api/ws';

import axios from '../../axios';
import UserListItem from "./users-list-item";


const UserList = () => {



  const user = useSelector((state) => state.auth.userAuth);
  const [users, setUsers] = useState([]);
  
  //get list users
  useEffect(() => {
    sendMessage({
      status: 'auth',
      id: user.id
    })
    axios.get('/api/users/usersList', {
    }).then(
      async ({ data }) => {
        
        setUsers(data.users);     
    });
  }, [])
  

  const elements = users.map(item => {
    return (
        <UserListItem key={item.id} {...item}/>
    )    
  })

  return (
    
    <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">Пользователь</th>
            <th scope="col">Чат</th>
          </tr>
        </thead>
        <tbody>
          {elements}
        </tbody>
    </table>
  )
}

export default UserList;