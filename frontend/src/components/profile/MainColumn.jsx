import { useState } from "react"
import { TabBar } from "./TabBar"
import { Wall } from "./Wall"
import { Info } from "./Info";
import { Photos } from "./Photos";
import { Prods } from "./Prods";
import { Friends } from "./Friends";
import { Status } from "./Status";


export const MainColumn = ({ profile, posts, onPostCreated, onPostLikeToggle, isOwnProfile, currentUser, hasProdded }) => {

    const [showWall, setShowWall] = useState(true);
    const [showInfo, setShowInfo] = useState(false);
    const [showPhotos, setShowPhotos] = useState(false);
    const [showProds, setShowProds] = useState(false);
    const [showFriends, setShowFriends] = useState(false);

    console.log("MainColumn profile:", profile);

    return (
    <div className="mainColumn">
        <Status profile={profile} />
        <TabBar 
            showWall={showWall}
            setShowWall={setShowWall}
            showInfo={showInfo}
            setShowInfo={setShowInfo}
            showPhotos={showPhotos}
            setShowPhotos={setShowPhotos}
            showProds={showProds}
            setShowProds={setShowProds}
            showFriends={showFriends}
            setShowFriends={setShowFriends}
            isOwnProfile={isOwnProfile} 
            profile={profile}
            />
        <Wall 
            showWall={showWall} 
            posts={posts} 
            profile={profile} 
            onPostCreated={onPostCreated}
            onPostLikeToggle={onPostLikeToggle}
        />
        <Info showInfo={showInfo} profile={profile} />
        <Photos showPhotos={showPhotos} profile={profile} />
        {isOwnProfile && <Prods showProds={showProds} profile={profile} hasProdded={hasProdded} />}
        <Friends showFriends={showFriends} profile={profile}/>
    </div>
    )
}