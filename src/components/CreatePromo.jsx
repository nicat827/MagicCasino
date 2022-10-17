import React, {useState, useContext} from 'react';
import { Context } from '..';
import panel from '../styles/AdminPanel.module.css'
import Modal from '../UI/Modal/Modal';
import Span from '../UI/span/Span';
import { observer } from 'mobx-react-lite';

const CreatePromo = ({visible, setVisible}) => {

    const [promoName, setPromoName] = useState('')
    const [count, setCount] = useState(0)
    const [amount, setAmount] = useState(0)
    const [typePromo, setTypePromo] = useState('Обычка')

    const {store} = useContext(Context)

    const createPromo = async (e) => {
        e.preventDefault();
        const response = await store.createPromo(promoName, count, amount, typePromo)
        if (response.status === 200) {
            setVisible(false)
        }
        
    }

    return (
        <Modal visible={visible} setVisible={setVisible}>
                <form onSubmit={createPromo}>
                    <div className={panel.create__promoDiv}>
                        <Span className={panel.createPromo__span}>Название:</Span>
                        <input
                        className={panel.createPromo__input} 
                        value={promoName}
                        onChange={(e) => setPromoName(e.target.value)}
                        placeholder='Название'
                        type='text' 
                        />
                        <Span className={panel.createPromo__span}>Колличество активаций:</Span>
                        <input
                        value={count}
                        onChange={(e) => setCount(e.target.value)}
                        className={panel.createPromo__input}
                        type='number'
                        />
                        <Span className={panel.createPromo__span}>Сумма:</Span>
                        <input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className={panel.createPromo__input}
                        type='number'
                        />
                       
                        <select value={typePromo} onChange={(e) => setTypePromo(e.target.value)} className={panel.dropdownSpan}>
                            <option className={panel.option}>
                                Обычка
                            </option>

                            <option className={panel.option} >
                                Спец
                            </option>
                        </select>            
                        <button className={panel.createPromo__btn}>Создать</button>
                               
                    </div>
                </form> 
                </Modal>
    );
};

export default observer(CreatePromo);