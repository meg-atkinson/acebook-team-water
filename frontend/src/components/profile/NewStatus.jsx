export const NewStatus = ({ handleSubmit, newStatus, handleChange, handleClick }) => {

    return (
        <div className="statusContainer">
                <form onSubmit={handleSubmit}>
                    <input name="content" value={newStatus.content} onChange={handleChange} placeholder="Write your new status here" />
                    <div className="updateCancelButttons">
                        <input type="submit" value="Update" />
                        <button onClick={handleClick}>Cancel</button>
                    </div>
                </form>
            </div>
    )
}