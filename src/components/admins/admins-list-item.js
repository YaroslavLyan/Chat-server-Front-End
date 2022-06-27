import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { users } from '../../reducers/auth-reducer';
import axios from '../../axios';

const AdminsListItem = (data) => {   

    const dispatch = useDispatch();

    const [inpAc, setInpAc] = useState('activ');
    const [inp, setInp] = useState('lid-displ');

    const onChangeClass = () => {
        setInpAc('lid-displ');
        setInp('activ');       
    }
  
    
    const onNameChange = async (e) => {
            
        setInpAc('activ');
        setInp('lid-displ');
        
        await axios.post('/api/users/editName', {
            body: {
                name: e.target.value,
                id: data.id
            },
        }).then(
            async ({ data }) => {
              
              dispatch(users(data.users));  
          });
    }

    const onChangeActive = async (e) => {
        try {            
            await axios.post('/api/users/changeOnBan', {
                body: {
                    id: data.id
                },
            }).then(
                async ({ data }) => {
                
                dispatch(users(data.users));  
            });
        } catch (e) {
            console.log(e);
        };
    }

    const onDeleteUser = async (e) => {
        try {             
            await axios.post('/api/users/deleteUser', {
                body: {
                    id: data.id
                },
            }).then(
                async ({ data }) => {
                
                dispatch(users(data.users));  
            });
        } catch (e) {
            console.log(e);
        };
    }

    const {id, name, login, rule} = data;
    
    return (
        <tr>
            <td>{id}</td>
            <td><div className={inpAc} onClick={onChangeClass}>{name}</div>
                <div className={inp}>
                <input type="text"
                    name='name' defaultValue={name} onBlur={onNameChange} 
                    onKeyDown={ev => {
                        ev.key === 'Enter' && ev.target.blur()
                        }} 
                />
                </div>
            </td>
            <td>{login}</td>
            <td>{rule}</td>
            <td><button className='btm-activ' onClick={onChangeActive}>
                    <i className={rule !== 0 ? "fa-solid fa-check" : "fa-solid fa-xmark"}></i>
                </button>
            </td>
            <td><button className='btm-activ' onClick={onDeleteUser}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    
    )

}

export default AdminsListItem;