import React, { useEffect, useState } from 'react';
import styles from './statistics.module.css';
import '../app/globals.css';
import Navbar from "@/components/Navbar";
import { getAll, getColors, GetStatusesResponse } from "@/services";
import Modal from 'react-modal';
import {IoCloseSharp} from "react-icons/io5";

Modal.setAppElement('#__next');

const StatisticsPage: React.FC = () => {
    const [data, setData] = useState<GetStatusesResponse[]>([]);
    const [colors, setColors] = useState<{ [key: string]: number }>({});
    const [currentId, setCurrentId] = useState<string | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const allData = await getAll();
            setData(allData);
        };

        fetchData();
    }, []);

    const formatDate = (timestamp: string): string => {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    };

    const formatTime = (timestamp: string): string => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString();
    };

    const fetchColors = async (id: string) => {
        const colorsData = await getColors(id);
        setColors(colorsData);
        setCurrentId(id);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setColors({});
        setCurrentId(null);
    };

    return (
        <div>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.body}>
                    <h1 className={styles.h1}>Color Sorter - Statistics</h1>
                    <table className={styles.table}>
                        <thead>
                        <tr className={styles.tr}>
                            <th className={styles.th}>ID</th>
                            <th className={styles.th}>Quantity to be Sorted</th>
                            <th className={styles.th}>Date</th>
                            <th className={styles.th}>Time</th>
                            <th className={styles.th}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map(item => (
                            <tr key={item._id} className={styles.tr}>
                                <td className={styles.td}>{item._id}</td>
                                <td className={styles.td}>{item.amountToBeSorted}</td>
                                <td className={styles.td}>{formatDate(item.timestamp)}</td>
                                <td className={styles.td}>{formatTime(item.timestamp)}</td>
                                <td className={styles.td}>
                                    <button className={styles.btn} onClick={() => fetchColors(item._id)}>Load sorted</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Colors Modal"
                        className={styles.modal}
                        overlayClassName={styles.overlay}
                    >
                        <h2 className={styles.modalTitle}>Colors for ID: {currentId}</h2>
                        <button onClick={closeModal} className={styles.closeButton}><IoCloseSharp /></button>
                        <ul>
                            {Object.entries(colors).map(([color, count]) => (
                                <li key={color} className={styles.colorItem}>
                                    <span className={styles.colorLabel} style={{ backgroundColor: color }}></span>
                                    {color}: {count}
                                </li>
                            ))}
                        </ul>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default StatisticsPage;
