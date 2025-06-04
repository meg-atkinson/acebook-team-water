import { useState } from "react"

import { TabBar } from "./TabBar"
import { Wall } from "./Wall"
import { Info } from "./Info";
import { Photos } from "./Photos";

export const MainColumn = () => {
    const [showWall, setShowWall] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [showPhotos, setShowPhotos] = useState(false);

    return (
    <div className="mainColumn">
        <TabBar showWall={showWall} setShowWall={setShowWall} showInfo={showInfo} setShowInfo={setShowInfo} showPhotos={showPhotos} setShowPhotos={setShowPhotos} />
        <Wall showWall={showWall} />
        <Info showInfo={showInfo} />
        <Photos showPhotos={showPhotos}/>
    </div>
    )
}