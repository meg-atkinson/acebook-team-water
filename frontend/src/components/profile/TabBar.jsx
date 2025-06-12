import { TabButton } from "./TabButton"

export const TabBar = ({ setShowWall, setShowInfo, setShowPhotos, setShowProds, setShowFriends, isOwnProfile }) => {
    return (
        <div className="TabBar">
            <TabButton name="wall" value="Wall" setShowComponent={setShowWall} otherComponents={[setShowInfo, setShowPhotos, setShowProds, setShowFriends]} />
            <TabButton name="info" value="Info" setShowComponent={setShowInfo} otherComponents={[setShowWall, setShowPhotos, setShowProds, setShowFriends]} />
            <TabButton name="photos" value="Photos" setShowComponent={setShowPhotos} otherComponents={[setShowWall, setShowInfo, setShowProds, setShowFriends]} />
            {isOwnProfile && <TabButton name="prods" value="Prods" setShowComponent={setShowProds} otherComponents={[setShowWall, setShowInfo, setShowPhotos, setShowFriends]} />}
            <TabButton name="friends" value="Friends" setShowComponent={setShowFriends} otherComponents={[setShowWall, setShowInfo, setShowPhotos, setShowProds]}/>
        </div>
    )
}