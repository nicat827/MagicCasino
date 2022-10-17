import React, {useState, useContext} from 'react';
import Modal from '../UI/Modal/Modal';
import cl from '../styles/Promocodes.module.css';
import { Context } from '..';
import {observer} from "mobx-react-lite";
import { AuthContext } from '../context';

const BannedUsers = ({visible, setVisible, bannedUsers, setBannedUsers, setTable}) => {

    const {store} = useContext(Context)
    const [valueSelect, setValueSelect] = useState('Остальное')
    

    const getBannedUsers = async () => {
        await store.getBannedUsers(valueSelect)     
        setVisible(false)
        setTable(true)
        

    
    }

    return (
        <Modal visible={visible} setVisible={setVisible}>
            <div className={cl.main__div}>
                <select value={valueSelect} onChange={(e) => setValueSelect(e.target.value)} className={cl.select}>
                    <option>Перматч</option>
                    <option>Остальное</option>
                </select>
                <button onClick={getBannedUsers} className={cl.loadPromos__btn}>Загрузить</button>
            </div>
        </Modal>
    );
};

export default observer(BannedUsers);