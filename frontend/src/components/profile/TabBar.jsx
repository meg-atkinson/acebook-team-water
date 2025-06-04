import { TabButton } from "./TabButton"

export const TabBar = ({ setShowWall, setShowInfo, setShowPhotos }) => {
    return (
        <div className="TabBar">
            <TabButton name="wall" value="wall" setShowComponent={setShowWall} otherComponents={[setShowInfo, setShowPhotos]}/>
            <TabButton name="info" value="info" setShowComponent={setShowInfo} otherComponents={[setShowWall, setShowPhotos]} />
            <TabButton name="photos" value="photos" setShowComponent={setShowPhotos} otherComponents={[setShowWall, setShowInfo]} />
            <TabButton name="prods" value="prods" setShowWall={setShowWall} />
            <TabButton name="friends" value="friends" setShowWall={setShowWall} />
        </div>
    )
}