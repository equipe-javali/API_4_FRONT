import React from 'react';
import './css/alertView.css';

export default function AlertView() {
    
    return (
        <section className='alert-section'>
            <div className='alert-card'>
                <p>📢 Estação 1: Temperatura muito baixa</p>
            </div>
            <div className='alert-card'>
                <p>📢 Estação 2: Temperatura alta</p>
            </div>
        </section>
    )

}