import Round from "../../database/models/round";
import Word from "../../database/models/word";
import sequelize from "../../database/connection";
import RoundWord from "../../database/models/roundword";


async function addWord(t, roundId, submittedWord) {
    let word = await Word.findOne({ where: { word: submittedWord, roundId: roundId } });

    if (word) {
        await word.increment('occurence', { transaction: t });
    } else {
        await Word.create({ word: submittedWord, roundId: roundId, occurence: 1 }, { transaction: t });
    }
}

async function finishRound(t, roundId) {
    let winnerWord = await Word.findOne({
        attributes: ['word', 'occurence'],
        order: [[sequelize.fn('max', sequelize.col('occurence')), 'DESC']],
        group: ["word"],
        where: {
            roundId: roundId
        },
        raw: true,
        transaction: t
    });

    await RoundWord.create({ word: winnerWord.word, roundId: roundId }, { transaction: t });

    await Round.update({ finishedAt: sequelize.literal('CURRENT_TIMESTAMP') }, {
        where: {
            id: roundId
        },
        transaction: t
    });

    await Round.create({}, { transaction: t });
}

async function validateHuman(token) {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
        {
            method: "POST",
        });

    const data = await response.json();

    return data.success;
}

export default async function handler(req, res) {
    const isHuman = await validateHuman(req.body.token);

    if (!isHuman) {
        res.status(400).json({ message: "Wall of Words don't like bots" });
        return;
    }
    const t = await sequelize.transaction();
    const word = req.body.word;

    if (!word) {
        res.status(400).json({ response: false, message: "Please Enter a Word." });
        return;
    }

    var submittedWord = word.toUpperCase();

    var roundId = await Round.max('id');
    var votes = await Word.sum('occurence', {
        where: {
            roundId: roundId
        }
    });

    var total = 2 ** roundId;

    if (votes === total - 1) {
        await addWord(t, roundId, submittedWord);
        await finishRound(t, roundId);
        await t.commit();
        res.status(200).json({ response: true, message: "Thank you for your vote:" + submittedWord });
    } else if (votes < total) {
        await addWord(t, roundId, submittedWord);
        await t.commit();
        res.status(200).json({ response: true, message: "Thank you for your vote:" + submittedWord });
    } else {
        await finishRound(t, roundId);
        await t.commit();
        res.status(200).json({ response: false, message: "Round is Done, Vote Again!" });
    }

}