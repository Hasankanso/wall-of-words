import Word from "../../database/models/word";
import Round from "../../database/models/round";
import sequelize from "../../database/connection";

export default async function handler(req, res) {

    var roundId = await Round.max('id');

    var words = await Word.findAll({
        limit: 7,
        where: {
            roundId: roundId,
        },
        attributes: [
            "word", "occurence"
        ],
        order: [[sequelize.fn('max', sequelize.col('occurence')), 'DESC']],
        group: ["word"],
        raw: true
    });

    res.status(200).json(
        {
            roundId: roundId,
            wordsvotes: words
        }
    )
}