import Head from "next/head";
import Script from "next/script";
import react, { useEffect, useRef, useState } from "react";
import WoWNavigator from './components/wownavigator';

export default function History() {

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
                <p className="text-3xl font-extrabold animate-ping1 text-yellow-400">
                    History
                </p>
                <div
                    className={
                        "font-bold bg-black bg-opacity-10 px-24 rounded-xl lg:flex h-auto md:flex flex-col space-y-2  text-center scrollbar-none overflow-y-scroll justify-start items-start"
                    }
                >
                    {roundWords.length == 0 ? <p>Loading...</p> : roundWords.map((val, index) =>
                        <>
                            <p
                                key={index}
                                className={
                                    index == 0 ? "hidden" : "text-white self-center"
                                }
                                style={{ fontSize: index < 18 ? 20 / index + 15 : 15 }}
                            >
                                {val}<sub fontSize={15}>{roundWords.length - index - 1}</sub>
                            </p>
                        </>

                    )}
                </div>
                <WoWNavigator />
            </div>
        </>
    );
}