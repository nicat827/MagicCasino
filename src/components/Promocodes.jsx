import React, {useState, useContext} from 'react';
import Modal from '../UI/Modal/Modal';
import cl from '../styles/Promocodes.module.css';
import { Context } from '..';

import { AuthContext } from '../context';

const Promocodes = ({visible, setVisible, setTable}) => {
    const {store} = useContext(Context)
    const {promocodes, setPromocodes} = useContext(AuthContext)
    const [valueSelect, setValueSelect] = useState('Все промокоды')
    
    const getPromo = async () => {
        
        const promosArr = await store.getPromoFromDb(valueSelect)
        if (promosArr) {
            setPromocodes(promosArr.promo)
            setVisible(false)
            setTable(true)
        }
        


    }

    return (
        <Modal visible={visible} setVisible={setVisible}>
            <div className={cl.main__div}>
                <select value={valueSelect} onChange={(e) => setValueSelect(e.target.value)} className={cl.select}>
                    <option>Все промокоды</option>
                    <option>Активные промокоды</option>
                </select>
                <button onClick={getPromo} className={cl.loadPromos__btn}>Загрузить</button>
                
        </div>
        </Modal>
    );
};

export default Promocodes;