export const Wall = ({ showWall }) => {

    if (showWall) {
        return (
            <div className="wallContainer">
                <div className="mockWallPost">
                    <div className="mockWallHeadings">
                        <p>Friend posted on your wall:</p>
                        <p>@ time, date</p>
                    </div>
                    <div className="mockWallContent">
                        <p>content</p>
                    </div>
                </div>
            </div>
        )
    }
}