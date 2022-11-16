import React, { useState } from "react"

function Bounty(props) {
    const [editMode, setEditMode] = useState(false)

    const [editedBounty, setEditedBounty] = useState({
        ...props.bounty
    })

    function handleBountyEdit(event) {
        const { name, value, type, checked } = event.target
        setEditedBounty(prevEditedBounty => ({ ...prevEditedBounty, [name]: type === "checkbox" ? checked : value }))
    }

    function changeEditMode() {
        setEditMode(prevEditMode => !prevEditMode)
    }

    function saveEdits() {
        props.handleEdit(props.bounty._id, editedBounty)
        setEditMode(prevEditMode => !prevEditMode)
    }

    return (
        <>
            {!editMode ?
                <div className="bounty-container">
                    <div className="bounty-info">
                        <p className="name">{props.bounty.firstName} {props.bounty.lastName}</p>
                        <p className={`${props.bounty.type === "Sith" ? "sith" : "jedi"}`}>{props.bounty.type}</p>
                        <p className="reward-color">Reward: {props.bounty.bountyAmount}</p>
                        <p>{props.bounty.living ? "ALIVE" : "DEAD"}</p>
                    </div>
                    <div className="small-button-container">
                        <button onClick={changeEditMode} className="small-button">Edit</button>
                        <button onClick={() => props.deleteMovie(props.bounty._id)} className="small-button">Delete</button>
                    </div>

                </div> :
                <div className="bounty-container edit">
                    <input
                        className="input-box"
                        type="text"
                        name="firstName"
                        value={editedBounty.firstName}
                        onChange={handleBountyEdit}
                    />
                    <input
                        className="input-box"
                        type="text"
                        name="lastName"
                        value={editedBounty.lastName}
                        onChange={handleBountyEdit}
                    />
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            id="living"
                            checked={editedBounty.living}
                            onChange={handleBountyEdit}
                            name="living"
                        />
                        <label htmlFor="living" className="small-font">Is Alive?</label>
                    </div>
                    <div >
                    <label htmlFor="bountyAmount" className="small-font">Reward Amount $</label>
                    <input
                        className="input-box reward"
                        type="number"
                        name="bountyAmount"
                        value={editedBounty.bountyAmount}
                        onChange={handleBountyEdit}
                    />
                    </div>
                    <input
                        className="input-box"
                        type="text"
                        name="type"
                        value={editedBounty.type}
                        onChange={handleBountyEdit}
                        placeholder="Sith or Jedi"
                    />
                    <button onClick={saveEdits} className="small-button save">Save Edits</button>
                </div>
            }
        </>
    )
}

export default Bounty
