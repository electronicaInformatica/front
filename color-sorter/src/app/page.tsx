"use client";

import React, { useState } from 'react';
import styles from './page.module.css';
import Navbar from "@/components/Navbar";
import { startSorting, getColors } from '@/services';

const IndexPage: React.FC = () => {
    const [amountToBeSorted, setAmountToBeSorted] = useState<number>(0);
    const [sortingId, setSortingId] = useState<string>('');
    const [colors, setColors] = useState<{ [color: string]: number }>({});


    const handleStartClick = async () => {
        const response = await startSorting(amountToBeSorted);
        setSortingId(response.sortingId);
    };

    const fetchColors = async () => {
        if (sortingId) {
            const colorsData = await getColors(sortingId);
            setColors(colorsData);
        }
    };

    return (
        <div>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.inputContainer}>
                    <h1 className={styles.title}>Color Sorter</h1>
                    <label htmlFor="rockletCount" className={styles.label}>Quantity to Sort:</label>
                    <input
                        type="number"
                        id="rockletCount"
                        className={styles.input}
                        value={amountToBeSorted}
                        onChange={(e) => setAmountToBeSorted(Number(e.target.value))}
                    />
                </div>
                <div className={styles.btns}>
                    <button className={styles.btn} onClick={handleStartClick}>Start</button>
                    <button className={styles.btn} onClick={fetchColors}>Load sorted</button>
                </div>
                <div className={styles.colorsContainer}>
                    <h2>Sorting ID: {sortingId}</h2>
                    <ul>
                        {Object.entries(colors).map(([color, count]) => (
                            <li key={color} className={styles.colorItem}>
                                <span className={styles.colorLabel} style={{backgroundColor: color}}></span>
                                {color}: {count}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default IndexPage;
