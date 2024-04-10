import Card from "../Models/cardModel.js";

export const cardDetails = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const allCards = async (req, res) => {
  try {
    // Fetch all cards from the database
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
