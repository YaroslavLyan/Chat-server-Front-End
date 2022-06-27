import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { users } from '../../reducers/auth-reducer';
import axios from '../../axios';
import AdminAdd from "./admin-add";
import AdminsListItem from './admins-list-item';

import './admins.css';

const AdminsList = () => {

  const usersList = useSelector((state) => state.auth.usersList);
  const dispatch = useDispatch();
  
  //get list users
  useEffect(() => {
    axios.get('/api/users/adminsList', {
    }).then(
      async ({ data }) => {
        
        dispatch(users(data.users));  
    });
  }, [])
 

  const elements = usersList.map(item => {
        
    return (
      <AdminsListItem key={item.id} {...item}/>
    )
  })

  return (
      <>
    <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">Пользователь</th>
            <th scope="col">Login</th>
            <th scope="col">Rule</th>
            <th scope="col">Activ</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {elements}
        </tbody>
    </table>
    <AdminAdd/>
    </>
  )
}

export default AdminsList;