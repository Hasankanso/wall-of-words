import React from "react";

export default function WoWNavigator(props) {

    let execlude = props.execlude;
    function openPage(link, window) {

        window.open(process.env.NEXT_PUBLIC_SERVER + link, "_self");
    }

    let link = process.env.NEXT_PUBLIC_SERVER;
    return (
        <div>
            {execlude === "/winner" ? null : <a target="_self" href={link + 'winner'}><button
                className="lg:p-2 md:p-2 p-1 bg-yellow-400 tracking-wider rounded-xl font-extrabold text-black"
            >Winner Word</button></a>}&nbsp;&nbsp;
            {execlude === "/stats" ? null : <a target="_self" href={link + 'stats'}><button
                className="lg:p-2 md:p-2 p-1 bg-yellow-400 tracking-wider rounded-xl font-extrabold text-black"
            >Live Results</button></a>}&nbsp;&nbsp;
            {execlude === "/vote" ? null : <a target="_self" href={link + 'vote'}><button
                className="lg:p-2 md:p-2 p-1 bg-yellow-400 tracking-wider rounded-xl font-extrabold text-black"
            >Vote Now!</button></a>}


        </div>
    );
}