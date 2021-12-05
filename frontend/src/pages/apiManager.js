import React from 'react';
import GestionAPI from '../gestionAPI/gestionAPI';

const APIManager = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh'
            }}
        >
            <div className="gestionAPI">
                <GestionAPI />
            </div>
        </div>
    );
};

export default APIManager;