"use client"
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

import Blacksite from '../components/site/blacksite';


const Home: NextPage = () => { 

    return (
        <div className={styles.maincontainer}>

            <main className={styles.main}>

            
            <Blacksite
            />
            
            </main>

           
        </div>
    );
};

export default Home;
