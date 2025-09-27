import React from 'react';
import { Outlet } from 'react-router';
import LeftNav from '../ShareComponent/LeftNav';
import RightNav from '../ShareComponent/RightNav';

const Root = () => {
    return (
        <div className='grid grid-cols-12'>
            {/* left nav */}
            <section className='col-span-3'><LeftNav></LeftNav></section>

            <main className='col-span-6'><Outlet></Outlet></main>

            {/* right nav */}
            <section className='col-span-3'><RightNav></RightNav></section>
        </div>
    );
};

export default Root;