import React from 'react';
import styles from './statistics.module.css';
import Link from "next/link";
import '../app/globals.css'
import Navbar from "@/components/Navbar";

const StatisticsPage: React.FC = () => {
    return (
        <div>
            <Navbar/>
            <div className={styles.container}>
                <h1 className={styles.name}>Color Sorter - Statistics</h1>
                <div className={styles.btns}>
                    <Link href={"/"}>
                        <button className={styles.btn}>Go back</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StatisticsPage
