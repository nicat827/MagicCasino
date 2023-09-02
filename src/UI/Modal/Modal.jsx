import React from 'react';
import cl from './Modal.module.css'
const Modal = ({children, visible, setVisible, isForMines}) => {
    
    const rootClasses = [cl.modal]
    
    if (visible) {
        rootClasses.push(cl.active)

    }
    

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}  >
            <div className={isForMines === 'win' ? cl.modalContentForMinesWin :  isForMines === 'lose' ? cl.modalContentForMinesLose : cl.modalContent } onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
            
        </div>
    );
};

export default Modal;