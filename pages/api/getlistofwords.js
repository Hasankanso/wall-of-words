import RoundWord from "../../database/models/roundword";

export default async function handler(req, res) {

  var roundswords = await RoundWord.findAll();

  roundswords = roundswords.map( (element) => element.word);
  res
    .status(200)
    .json(roundswords);
}