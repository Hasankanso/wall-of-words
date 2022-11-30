import Round from "../../database/models/round";

export default async function handler(req, res) {

    var roundId = await Round.max('id');

    res.status(200).json(
        {
            roundId : roundId
        }
    )
}