import React, {useState, useEffect} from "react"
import axios from "axios"
import Bounty from "./components/Bounty.js"
import AddBountyForm from "./components/AddBountyForm.js"
import Header from "./components/Header.js"

function App() {
    const [bounties, setBounties] = useState([])

    function getBounties() {
        axios.get("/bounties")
            .then(res => setBounties(res.data))
            .catch(err => console.log(err))
    }

    function addBounty(newBounty) {
        axios.post("/bounties", newBounty)
            .then(res => {
                setBounties(prevBounties => [...prevBounties, res.data])
            })
            .catch(err => console.log(err))
    }

    function deleteMovie(bountyId) {
        axios.delete(`/bounties/${bountyId}`)
            .then(res => {
                setBounties(prevBounties => prevBounties.filter(bounty => bounty._id !== bountyId))
            })
            .catch(err => console.log(err))
    }

    function editBounty(bountyId, updatedBounty) {
        axios.put(`/bounties/${bountyId}`, updatedBounty)
            .then(res => {
                setBounties(prevBounties => prevBounties.map(bounty => bounty._id !== bountyId ? bounty : res.data))
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getBounties()
    }, [])

    const bountyListElements = bounties.map(function(bounty) {
        return (
            <Bounty 
                key={bounty._id}
                bounty={bounty}
                deleteMovie={deleteMovie}
                handleEdit={editBounty}
            />
        )
    })

    return (
        <div>
            <Header />
            <AddBountyForm 
                addBounty={addBounty}
            />
            <div className="body-container">
            {bountyListElements}
            </div>
            
        </div>
    )
}

export default App