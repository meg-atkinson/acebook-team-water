import { useState } from "react"

import { TabBar } from "./TabBar"
import { Wall } from "./Wall"
import { Info } from "./Info";
import { Photos } from "./Photos";
import { Prods } from "./Prods";
import { Friends } from "./Friends";
import { Status } from "./Status";

export const MainColumn = ({ user, posts }) => {
    const [showWall, setShowWall] = useState(true);
    const [showInfo, setShowInfo] = useState(false);
    const [showPhotos, setShowPhotos] = useState(false);
    const [showProds, setShowProds] = useState(false);
    const [showFriends, setShowFriends] = useState(false);

    return (
    <div className="mainColumn">
        <Status user={user} />
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
            setShowFriends={setShowFriends} />
        <Wall showWall={showWall} posts={posts}/>
        <Info showInfo={showInfo} user={user} />
        <Photos showPhotos={showPhotos} user={user} />
        <Prods showProds={showProds} />
        <Friends showFriends={showFriends} user={user} />
    </div>
    )
}