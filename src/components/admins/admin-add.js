import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { users } from '../../reducers/auth-reducer';
import axios from '../../axios';

const AdminAdd = () => {

    const dispatch = useDispatch();

    const [admin, setAdmin] = useState({
        name: '',
        login: '',
        passw: '',
        rule: 0,

    });


    const onSubmit = (e) => {
        e.preventDefault()
        try {
            axios.post('/api/users/addUser', {
                body: admin
            }).then(
                async ({ data }) => {
                
                dispatch(users(data.users));  

            });
        } catch (e) {
            console.log(e);
        };
    }

    const onValueChange = (e) => {
        let newValue = e.target.value;
  
        setAdmin((prevState) => ({
            ...prevState,
           [e.target.name]: newValue
        }))
    }


    return (
        <form className="row g-3" onSubmit = {onSubmit}>
            <h2>Создать пользователя</h2>
            <div className="col-md-2">
                <label>Имя</label>
                <input type="text" className="form-control"
                    name="name"
                    onChange={onValueChange} required/>
            </div>
            <div className="col-md-2">
                <label>Login</label>
                <input type="text" className="form-control"
                    name="login"
                    onChange={onValueChange} required/>
            </div>
            <div className="col-md-2">
                <label>Password</label>
                <input type="password" className="form-control"
                    name="passw"
                    onChange={onValueChange} required/>
            </div>
            <div className="col-md-2">
                <label>Password</label>
                <select name="rule" className='form-control' onChange={onValueChange}>
                    <option value='0'>Не активен</option>
                    <option value='1'>Администратор</option>
                    <option value='2'>Пользователь</option>
                </select>
            </div>
         
            
            <div className="col-12">
                <button type="submit" className="btn btn-primary">Добавить нового пользователя</button>
            </div>
        </form>

    )
  
}

export default AdminAdd;