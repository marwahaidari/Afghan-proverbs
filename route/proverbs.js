const express = require('express');
const router = express.Router();
const { getAllProverbs, getProverbById, updateProverb, addProverb, deleteProverb } = require("../controllers/proverbssController");

router.get("/", getAllProverbs);
router.get('/:id', getProverbById)
router.post('/', addProverb)
router.put('/:id', updateProverb)
router.delete('/:id', deleteProverb)

module.exports = router;