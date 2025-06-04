export const NewStatus = ({ handleSubmit, handleChange, handleClick }) => {

    return (
        <div className="statusContainer">
                <form onSubmit={handleSubmit}>
                    <input placeholder="Write your new status here" />
                    <div className="updateCancelButttons">
                        <input type="submit" value="Update" onChange={handleChange} />
                        <button onClick={handleClick}>Cancel</button>
                    </div>
                </form>
            </div>
    )
}