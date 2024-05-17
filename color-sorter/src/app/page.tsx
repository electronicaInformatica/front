"use client";

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { FaSpinner } from 'react-icons/fa';

const IndexPage: React.FC = () => {
    const [count, setCount] = useState<number>(0);
    const [id, setId] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const generateRandomId = () => {
            return Math.floor(10000 + Math.random() * 90000).toString();
        };
        setId(generateRandomId());
    }, []);

    const handleStartClick = () => {
        setIsLoading(true)

        const data = {
            id,
            count
        };

        console.log('Data to send:', data);

        fetch('/api/count-rocklets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setIsLoading(false);
            });
    };

    return (
        <div>
            <Navbar />
            <div className={styles.container}>
                <h1 className={styles.title}>Color Sorter</h1>
                <a></a>
                <div className={styles.inputContainer}>
                    <label htmlFor="rockletCount" className={styles.label}>Quantity of Rocklets:</label>
                    <input
                        type="number"
                        id="rockletCount"
                        className={styles.input}
                        value={count}
                        onChange={(e) => setCount(Number(e.target.value))}
                    />
                </div>
                <div className={styles.btns}>
                    <button className={styles.btn} onClick={handleStartClick} disabled={isLoading}>Start</button>
                    <button className={styles.btn} disabled={isLoading}>Stop</button>
                    <Link href={"/statistics"}>
                        <button className={styles.btn} disabled={isLoading}>Statistics</button>
                    </Link>
                </div>
                {isLoading && (
                    <div className={styles.loadingContainer}>
                        <FaSpinner className={styles.spinner} />
                        <p>Sorting...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IndexPage;
