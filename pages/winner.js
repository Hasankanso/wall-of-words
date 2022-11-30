import Head from "next/head";
import react, { useEffect, useRef, useState } from "react";
import WoWNavigator from './components/wownavigator';
import WinnerWordDefinitions from './components/worddefinitions';
import historyIcon from '../public/history.png';
import Image from 'next/image';
import infoImage from '../public/info.png';

export default function WinnerWord() {

    const [roundWords, setroundWords] = useState([]);

    async function getroundsWords() {
        try {
            let words = await fetch(process.env.NEXT_PUBLIC_SERVER + `api/getlistofwords`);
            words = await words.json();

            words = words.reverse();
            setroundWords(words);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getroundsWords();
    }, [])

    return (
        <>
            <Head>
                <meta name="theme-color" content="#171C28"></meta>
            </Head>
            <div className="relative bg-halloween bg-[#171C28] space-y-10 text-white bg-center bg-cover flex flex-col justify-center items-center  h-[100vh] w-[100vw]">
                <div className="text-black font-bold"><p>                <Image
                    style={{ alignSelf: 'center' }}
                    src={infoImage}
                    alt={"Important to know"}
                    width="32px"
                    height="32px"
                />This is a social game. Vote for a word, and it could be seen by millions. Vote for something that means a lot to you! After each round the number of needed votes will multiple by 2.</p></div>
                <div className="text-black font-bold"><p>The Winner Word for Round {roundWords.length - 1} is</p></div>
                <div className="text-yellow-400 lg:flex md:flex font-bold animate-bounce">
                    <p className="text-8xl tracking-wide font-extrabold">
                        {roundWords[0] ?? "Loading"}
                    </p><a target="_self" href={process.env.NEXT_PUBLIC_SERVER + "/history"}><Image
                        src={historyIcon}
                        alt={"open history"}
                        width="35px"
                        height="28px"
                        title="Rounds History"
                    /></a>
                </div>
                <WinnerWordDefinitions winnerword={roundWords[0]} />
                <WoWNavigator execlude="/winner" />
                <a target="_blank" rel="noreferrer" href={"https://www.paypal.com/donate/?hosted_button_id=7LWTZWHFPGWPY"}><button
                    className="lg:p-2 md:p-2 p-1 bg-yellow-400 tracking-wider rounded-xl font-extrabold text-black"
                >Support me</button></a>
            </div>
        </>
    );
}