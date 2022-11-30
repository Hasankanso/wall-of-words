import React from "react"
import wikiImage from '../../public/wiki.png';
import Image from 'next/image';

export default function WinnerWordDefinitions(props) {

    var winnerword = props.winnerword ?? "";

    return (
        <>
            <div className="text-black font-bold">
                Know more about {winnerword} on <a target="_blank" rel="noreferrer" href={"https://wikipedia.org/wiki/" + winnerword} ><Image
                    src={wikiImage}
                    alt={"search for " + winnerword + " on Wikipedia"}
                    width="45px"
                    height="38px"
                /></a>
                <br></br>
                <br></br>
                Know more about {winnerword} on <a target="_blank" rel="noreferrer" href={"https://www.oxfordlearnersdictionaries.com/definition/english/" + winnerword.toLowerCase() + "?q=" + winnerword} ><span style={{ color: 'blue' }}><u>Oxford Dictionary</u></span></a>
            </div>
        </>
    );
}