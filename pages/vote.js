import Head from "next/head";
import react, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import ReCAPTCHA from "react-google-recaptcha";
import WoWNavigator from './components/wownavigator';

export default function Home() {

  const [roundId, setRoundId] = useState(0);
  const [input, setinput] = useState()
  const [inputCheck, setinputCheck] = useState(false);
  const reRef = useRef();
  const [currentVotes, setCurrentVotes] = useState(0);

  var serverMessage = "Thank you for your vote!";


  async function getVoteProgress() {
    try {
      let votes = await fetch(`${process.env.NEXT_PUBLIC_SERVER}api/getvotes`);
      votes = await votes.json();
      setCurrentVotes(votes.current);
    } catch (error) {
      console.log(error);
    }
  }


  async function sendWord() {

    const token = await reRef.current.getValue();

    let res = await fetch(process.env.NEXT_PUBLIC_SERVER + `api/submitAWord`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ word: input, token: token })
      }
    );

    serverMessage = res.message;
    if (res.status == 200) {
      setinputCheck(true)
    } else {
      serverMessage = res.message;
      alert(serverMessage)
    }

    console.log(input)
  }

  useEffect(() => {
    getroundId();
    getVoteProgress();
  }, [])

  async function getroundId() {
    try {
      let roundId = await fetch(process.env.NEXT_PUBLIC_SERVER + `api/getcurrround`);
      roundId = await roundId.json();

      roundId = roundId.roundId;
      setRoundId(roundId);
    } catch (error) {
      console.log(error);
    }
  }

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
        {inputCheck ? (
          <>
            <div className="flex justify-center items-center lg:text-3xl md:text-2xl text-xl animate-pulse">
              Thank you for your vote!
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col justify-center items-center">
              <p className="lg:text-3xl text-3xl tracking-wider text-black font-bold">
                Enter your vote
              </p>
              <div className="flex mt-5 lg:space-x-3 md:space-x-3 space-x-1 mb-5">
                <input
                  className="lg:p-2 md:p-2 p-1 placeholder:font-bold placeholder:text-center border-yellow-400 font-bold rounded-lg text-black placeholder:text-xl text-xl tracking-wider placeholder:tracking-wider border-2"
                  placeholder="enter a word"
                  value={input}
                  onChange={(e) => setinput(e.target.value)}
                />
                <button
                  onClick={sendWord}
                  className="lg:p-2 md:p-2 p-1 animate-pulse bg-yellow-400 tracking-wider rounded-xl font-extrabold text-black"
                >
                  Submit
                </button>
              </div>
              <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} ref={reRef} size="normal" />
            </div>

          </>
        )}
        <WoWNavigator execlude="/vote" />
      </div>

    </>
  );
}