import React, {useContext, useEffect, useState} from 'react';
import Modal from '../UI/Modal/Modal';
import { observer } from 'mobx-react-lite';
import Span from '../UI/span/Span';
import { Context } from '..';
import panel from '../styles/AdminPanel.module.css'

import Promocodes from '../components/Promocodes';

import { AuthContext } from '../context';
import CreatePromo from '../components/CreatePromo';
import BannedUsers from '../components/BannedUsers';


const AdminPanel = () => {
    const [modal, setModal] = useState(false)
    const [table, setTable] = useState(false)
    const [bannedUsersTable, setBannedUsersTable] = useState(false)
    const {store} = useContext(Context)
    const [modalPromocodes, setModalPromocodes] = useState(false)
    const [modalChatBannedUsers, setModalChatBannedUsers] = useState(false)
    const [bannedUsers, setBannedUsers] = useState([])
    const {promocodes} = useContext(AuthContext)
    
    
    const unBanUser = async (id) => {
        const res = await store.unBanUser(id)
    }

    return (
        <>
            <div className={panel.panel}>
                <div className={panel.promo__div}>
                    <span className={panel.promocodes__link} onClick={() => setModal(true)}>Создать промокод</span>
                    <span className={panel.promocodes__link} onClick={() => setModalPromocodes(true)}>Активные промокоды</span>
                    <span className={panel.promocodes__link} onClick={() => setModalChatBannedUsers(true)}>Забаненные пользователи</span>
                </div>
                {modalPromocodes && <Promocodes visible={modalPromocodes} setVisible={setModalPromocodes} setTable={setTable} />}
                {modalChatBannedUsers && <BannedUsers bannedUsers={bannedUsers} setBannedUsers={setBannedUsers} setTable={setBannedUsersTable} visible={modalChatBannedUsers} setVisible={setModalChatBannedUsers}/>}
                {modal && <CreatePromo visible={modal} setVisible={setModal} />}
                <div className={panel.grid__table} style={table ? {display:'grid'} : {display:'none'}}>
                    <div className={panel.name__header}>Название</div>
                    <div className={panel.amount__header}>Сумма</div>
                    <div className={panel.count__header}>Активации</div>
                    <div className={panel.type__header}>
                        Тип
                        <div className={panel.closeIcon__div} onClick={() => setTable(false)} >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m8.4 17 3.6-3.6 3.6 3.6 1.4-1.4-3.6-3.6L17 8.4 15.6 7 12 10.6 8.4 7 7 8.4l3.6 3.6L7 15.6ZM5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm0-2h14V5H5v14ZM5 5v14V5Z"/></svg>
                        </div>
                    </div>
                    {promocodes.map(el =>
                        <React.Fragment key={el._id}>
                            <div   className={panel.body__table}>
                                <div key={el._id} className={panel.promoName__body}>{el.promo}</div>     
                            </div>

                            <div  className={panel.body__table}>
                                <div key={el._id}  className={panel.promoName__body}>{el.amount}р</div>
                            </div>
 
                            <div className={panel.body__table}>
                                <div key={el._id}  className={panel.promoName__body}>{el.count}</div>
                            </div >

                            
                            <div className={panel.body__tableEnd}>
                                <div key={el._id} className={panel.promoName__body}>{el.type}</div>
                            </div>
                        </React.Fragment>    
                    )}
                    

                </div>
                <div className={panel.grid__table2} style={bannedUsersTable ? {display:'grid'} : {display:'none'}}>
                    <div className={panel.name__header}>Ссылка</div>
                    <div className={panel.amount__header}>Имя</div>
                    <div className={panel.count__header}>Последнее сообщение</div>
                    <div className={panel.banned__header}>Забанил</div>
                    <div className={panel.unban__header}>
                        Кнопка разбана
                        <div className={panel.closeIcon__div} onClick={() => setBannedUsersTable(false)} >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m8.4 17 3.6-3.6 3.6 3.6 1.4-1.4-3.6-3.6L17 8.4 15.6 7 12 10.6 8.4 7 7 8.4l3.6 3.6L7 15.6ZM5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm0-2h14V5H5v14ZM5 5v14V5Z"/></svg>
                        </div>
                    </div>
                    
                    {store.bannedUsers.map(el =>
                        <React.Fragment key={el._id}>
                            <div   className={panel.body__table}>
                                <div key={el._id} className={panel.promoName__body}>{el.href}</div>     
                            </div>

                            <div  className={panel.body__table}>
                                <div key={el._id}  className={panel.promoName__body}>{el.name}</div>
                            </div>
 
                            <div className={panel.body__table}>
                                <div key={el._id}  className={panel.promoName__body}>{el.lastMessages[el.lastMessages.length-1]}</div>
                            </div >

                            
                            <div className={panel.body__table}>
                                <div key={el._id} className={panel.promoName__body}>{el.bannedBy}</div>
                            </div>
                            <div className={panel.body__tableEnd}>
                                <div className={panel.unban__btn} onClick={() => unBanUser(el.id)}>Разбанить</div>
                            </div>
                            
                        </React.Fragment>    
                    )}
                    

                </div>
            </div>
        </>
    );
};

export default observer(AdminPanel);