import React, { useState } from "react"

function AddBountyForm(props) {
    const initInputs = {
        firstName: "",
        lastName: "",
        living: true,
        bountyAmount: 0,
        type: ""
    }
    const [inputs, setInputs] = useState(initInputs)

    function handleChange(event) {
        const { name, value, type, checked } = event.target
        setInputs(prevInputs => ({ ...prevInputs, [name]: type === "checkbox" ? checked : value }))
    }

    function handleSubmit(event) {
        event.preventDefault()
        // console.log(inputs)
        props.addBounty(inputs)
        setInputs(initInputs)
    }

    return (
        <form onSubmit={handleSubmit} className="new-bounty-form">
            <input
                className="input-box"
                type="text"
                name="firstName"
                value={inputs.firstName}
                onChange={handleChange}
                placeholder="First Name"
            />
            <input
                className="input-box"
                type="text"
                name="lastName"
                value={inputs.lastName}
                onChange={handleChange}
                placeholder="Last Name"
            />
            <div className="checkbox-container">
                <input
                    type="checkbox"
                    id="living"
                    checked={inputs.living}
                    onChange={handleChange}
                    name="living"
                />
                <label htmlFor="living" className="small-font">Is Alive?</label>
            </div>
            <div>
                <label htmlFor="bountyAmount" className="small-font">Reward Amount $</label>
                <input
                    className="input-box reward"
                    type="number"
                    name="bountyAmount"
                    value={inputs.bountyAmount}
                    onChange={handleChange}
                />
            </div>
            <input
                className="input-box"
                type="text"
                name="type"
                value={inputs.type}
                onChange={handleChange}
                placeholder="Sith or Jedi"
            />
            <button className="submit">Add Bounty</button>
        </form>
    )
}

export default AddBountyForm