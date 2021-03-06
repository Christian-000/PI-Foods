import React from "react";
import { Link } from "react-router-dom";
import styles from '../Styles/LandingPage.module.css';

export default function LadingPage() {
    return (
        <div className={styles.div}>
            <h1 className={styles.landing} data-testid={'title'}>WELCOME TO MY FOODPAGE </h1>
            <Link to='/home'>
                <button className={styles.button} data-testid={'button'}>GO AHEAD</button>  
            </Link>
        </div>
    )
}