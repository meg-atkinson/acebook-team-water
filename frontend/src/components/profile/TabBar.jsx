import { TabButton } from "./TabButton"

export const TabBar = ({ setShowWall, setShowInfo, setShowPhotos, setShowProds, setShowFriends }) => {
    return (
        <div className="TabBar">
            <TabButton name="wall" value="wall" setShowComponent={setShowWall} otherComponents={[setShowInfo, setShowPhotos, setShowProds, setShowFriends]} />
            <TabButton name="info" value="info" setShowComponent={setShowInfo} otherComponents={[setShowWall, setShowPhotos, setShowProds, setShowFriends]} />
            <TabButton name="photos" value="photos" setShowComponent={setShowPhotos} otherComponents={[setShowWall, setShowInfo, setShowProds, setShowFriends]} />
            <TabButton name="prods" value="prods" setShowComponent={setShowProds} otherComponents={[setShowWall, setShowInfo, setShowPhotos, setShowFriends]} />
            <TabButton name="friends" value="friends" setShowComponent={setShowFriends} otherComponents={[setShowWall, setShowInfo, setShowPhotos, setShowProds]}/>
        </div>
    )
}