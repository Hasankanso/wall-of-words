import Head from "next/head";
import MainChart from './components/wordschart';
import Script from "next/script";
import react, { useEffect, useRef, useState } from "react";
import WoWNavigator from './components/wownavigator';

export default function Stats() {

    const [wordsvotes, setwordsvotes] = useState([]);
    const [roundId, setRoundId] = useState(0);
    const [currentVotes, setCurrentVotes] = useState(0);

    var initialized = false;
    async function getwordsVotes() {
        try {
            let words = await fetch(`${process.env.NEXT_PUBLIC_SERVER}api/getwordsvotes`);
            words = await words.json();
            setwordsvotes(words.wordsvotes);
            setRoundId(words.roundId);
        } catch (error) {
            console.log(error);
        }
    }

    async function getVoteProgress() {
        try {
            let votes = await fetch(`${process.env.NEXT_PUBLIC_SERVER}api/getvotes`);
            votes = await votes.json();
            setCurrentVotes(votes.current);
        } catch (error) {
            console.log(error);
        }
    }

    async function init() {
        initialized = true;
        console.log("init data");
        await Promise.all([getVoteProgress(), getwordsVotes()]);
        setInterval(() => {
            getwordsVotes();
            console.log("refresh data");
        }, 10000);

    }

    useEffect(() => {
        if (!initialized) {
            init();
        }
    }, [])

    let total = 2 ** roundId;
    return (
        <>
            <Head>
                <meta name="theme-color" content="#171C28"></meta>
            </Head>
            <div className="relative bg-halloween bg-[#171C28] space-y-10 text-white bg-center bg-cover flex flex-col justify-center items-center  h-[100vh] w-[100vw]">
                <p className="text-3xl font-extrabold animate-ping1 text-yellow-400">
                    Round {roundId}
                </p>
                <p className="text-xl text-black font-extrabold">{currentVotes}/{total}  ({total - currentVotes} Remaining)</p>
                <p className={" text-2xl text-black font-extrabold self-center w-[28vw]"}> On Going Votes for Round {roundId}</p>
                <MainChart words={wordsvotes} />
                <WoWNavigator execlude="/stats" />
            </div>

        </>
    );
}