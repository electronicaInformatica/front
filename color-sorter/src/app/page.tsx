"use client";

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {PiSpinnerGapBold} from "react-icons/pi";
import { startSorting, stopSorting, getColors } from '@/services';

const IndexPage: React.FC = () => {
    const [amountToBeSorted, setAmountToBeSorted] = useState<number>(0);
    const [sortingId, setSortingId] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [colors, setColors] = useState<{ [color: string]: number }>({});

    useEffect(() => {
        const generateRandomId = () => {
            return Math.floor(10000 + Math.random() * 90000).toString();
        };
        setSortingId(generateRandomId());
    }, []);

    const handleStartClick = async () => {
        setIsLoading(true)

        const data = {
            sortingId: sortingId,
            amountToBeSorted: amountToBeSorted
        };

        console.log('Data to send:', data);

        const response = await startSorting(amountToBeSorted);
        setSortingId(response.sortingId);
    };

    const handleStopClick = async () => {
        setIsLoading(false)
        if (sortingId) {
            await stopSorting(sortingId);
            setSortingId('');
        }
    }

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
                <h1 className={styles.title}>Color Sorter</h1>
                <div className={styles.inputContainer}>
                    <label htmlFor="rockletCount" className={styles.label}>Quantity of Rocklets:</label>
                    <input
                        type="number"
                        id="rockletCount"
                        className={styles.input}
                        value={amountToBeSorted}
                        onChange={(e) => setAmountToBeSorted(Number(e.target.value))}
                    />
                </div>
                {isLoading && (
                    <div className={styles.loadingContainer}>
                        <PiSpinnerGapBold className={styles.spinner} />
                        <p>Sorting...</p>
                    </div>
                )}
                <div className={styles.btns}>
                    <button className={styles.btn} onClick={handleStartClick} disabled={isLoading}>Start</button>
                    <button className={styles.btn} onClick={handleStopClick}>Stop</button>
                    <Link href={"/statistics"}>
                        <button className={styles.btn} disabled={isLoading}>Statistics</button>
                    </Link>
                </div>
                {/*{sortingId && (*/}
                {/*    <div>*/}
                {/*        <h3>Sorting ID: {sortingId}</h3>*/}
                {/*        <h4>Colors:</h4>*/}
                {/*        <ul>*/}
                {/*            {Object.entries(colors).map(([color, count]) => (*/}
                {/*                <li key={color}>{color}: {count}</li>*/}
                {/*            ))}*/}
                {/*        </ul>*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        </div>
    );
};

export default IndexPage;
