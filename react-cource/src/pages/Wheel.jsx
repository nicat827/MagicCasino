import React, { useContext } from 'react';
import { Context } from '..';
import Button from '../UI/Button/Button';

const Wheel = () => {
    const {store} = useContext(Context)
    return (
        <div>
            Колесо
            <Button onClick={() => store.getPhoto()}>
                нажми
            </Button>
        </div>
    );
};

export default Wheel;