import Round from "../../database/models/round";
import Word from "../../database/models/word";
import sequelize from "../../database/connection";

export default async function handler(req, res) {

    var roundId = await Round.max('id');
    let total = 2 ** roundId;

    var votes = await Word.sum('occurence', {
        where: {
            roundId: roundId
        }
    });

    res.status(200).json(
        {
            total: total,
            current: votes ?? 0
        }
    )
}