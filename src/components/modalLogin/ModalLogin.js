import React from 'react'
import './ModalLogin.css';


export const ModalLogin = (showModalLogin,closeModalLoginHandler) => {
    return(
        <div className="modal-wrapper"
            style={{
                opacity:showModalLogin ? '0' : '1'
            }}>
            <div className="modal-header">
                <p>Inicia sesión</p>
                <span className="close-modal-btn">x</span>
            </div>
        <div className="modal-content">
            <div className="modal-body">
                <h4>Modal</h4>
                <p> lorem ipsum dolor sit amet amero doritoo</p>
            </div>
        </div>
        <div className="modal-footer">
            <button onClick={closeModalLoginHandler} className="btn-cancel">Close</button>
        </div>
        </div>
    )
};

