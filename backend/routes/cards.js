const cardsRouter = require('express').Router();
const {
  getAllCards, createCard, deleteCardById, addLike, deleteLike,
} = require('../controllers/cards');

const { createCardValidation, cardIdValidation } = require('../middlewares/validation');

cardsRouter.get('/', getAllCards);
cardsRouter.post('/', createCardValidation, createCard);
cardsRouter.delete('/:cardId', cardIdValidation, deleteCardById);
cardsRouter.put('/:cardId/likes', cardIdValidation, addLike);
cardsRouter.delete('/:cardId/likes', cardIdValidation, deleteLike);

module.exports = cardsRouter;
