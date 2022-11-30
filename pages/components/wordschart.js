import React from "react"
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { useState, useEffect } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const wordsColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255, 205, 86, )',
    'rgba(75, 192, 192, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(201, 203, 207, 1)'];
function getdata(words) {
    if (!words) {
        return undefined;
    }

    let sorted = words.sort((a, b) => b.occurence - a.occurence);

    let labels = [];
    let data = []
    for (let i in sorted) {
        let word = sorted[i];
        labels.push(word.word);
        data.push(word.occurence);
    }

    return {
        labels: labels, datasets: [
            {
                label: 'votes',
                data: data,
                borderColor: 'rgb(0, 0, 0)',
                backgroundColor: wordsColors,
            }]
    };
}

const axis = 'y';

// Hook
function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}

export default function MainChart(props) {
    const size = useWindowSize();

    const options = {
        aspectRatio: 2.1,
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            y: {
                ticks: {
                    font: {
                        size: size.width < 420 ? 8 : size.width < 700 ? 10 : 15,
                        weight: 'bold',
                    },
                    color: wordsColors,
                },
                grid: {
                    display: false,
                    borderColor: 'rgba(0,0,0, 0)',
                }
            },
            x: {
                beginAtZero: true,
                grid: {
                    display: true,
                    borderColor: 'rgba(0,0,0, 0.5)',
                },
                ticks: {
                    color: 'rgb(0,0,0.5)',
                    font: {
                        size: 18,
                        weight: 'bold'
                    },
                    major: {
                        enabled: false
                    },
                    stepSize: 1,
                }
            }
        },
        type: 'bar',
        indexAxis: axis,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false
            },
        },
    }

    //<div className={"flex flex-col flex-row overflow-y-auto"} style={{ position: "relative", height: '30vh', width: '35vw' }}>
    const data = getdata(props?.words ?? []);
    return (
        <div className={"flex flex-col flex-row overflow-y-auto"} style={{ position: "relative", width: size.width > 800 ? '45vw' : '75vw' }}>
            <Bar data={data} options={options}></Bar>
        </div>
    );
}