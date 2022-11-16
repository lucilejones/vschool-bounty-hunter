const express = require("express")
const bountyRouter = express.Router()
const Bounty = require("../models/BountyModel.js")

// to practice adding to database
// {
//     "firstName": "Obi-Wan",
//     "lastName": "Kenobi",
//     "living": false,
//     "bountyAmount": 74,
//     "type": "Jedi"
// }
// {
//     "firstName": "Kylo",
//     "lastName": "Ren",
//     "living": true,
//     "bountyAmount": 40,
//     "type": "Sith"
// }

// GET
bountyRouter.get("/", (req, res, next) => {
    Bounty.find((err, bounties) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(bounties)
    })
})

// GET (one)
bountyRouter.get("/:bountyId", (req, res, next) => {
    Bounty.findOne({_id: req.params.bountyId}, (err, foundBounty) => {
        if(err) {
            res.status(500)
            return next (err)
        }
        return res.status(200).send(foundBounty)
    })
})

// POST
bountyRouter.post("/", (req, res, next) => {
    const newBounty = new Bounty(req.body)
    newBounty.save((err, savedBounty) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedBounty)
    })
})

// DELETE
bountyRouter.delete("/:bountyId", (req, res, next) => {
    Bounty.findOneAndDelete({_id: req.params.bountyId}, (err, deletedBounty) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`${deletedBounty.firstName} ${deletedBounty.lastName} was deleted from the database.`)
    })
})

// PUT
bountyRouter.put("/:bountyId", (req, res, next) => {
    Bounty.findOneAndUpdate(
        {_id: req.params.bountyId},
        req.body,
        {new: true},
        (err, updatedBounty) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedBounty)
        }
    )
})

module.exports = bountyRouter