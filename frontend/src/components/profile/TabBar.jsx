import { TabButton } from "./TabButton"

export const TabBar = ({ setShowWall, setShowInfo }) => {
    return (
        <div className="TabBar">
            <TabButton name="wall" value="wall" setShowComponent={setShowWall} otherComponents={[setShowInfo]}/>
            <TabButton name="info" value="info" setShowComponent={setShowInfo} otherComponents={[setShowWall]} />
            <TabButton name="photos" value="photos" setShowWall={setShowWall} />
            <TabButton name="prods" value="prods" setShowWall={setShowWall} />
            <TabButton name="friends" value="friends" setShowWall={setShowWall} />
        </div>
    )
}