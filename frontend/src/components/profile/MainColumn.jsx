import { useState } from "react"

import { TabBar } from "./TabBar"
import { Wall } from "./Wall"
import { Info } from "./Info";

export const MainColumn = () => {
    const [showWall, setShowWall] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    return (
    <div className="mainColumn">
        <TabBar showWall={showWall} setShowWall={setShowWall} showInfo={showInfo} setShowInfo={setShowInfo}/>
        <Wall showWall={showWall} />
        <Info showInfo={showInfo} />
    </div>
    )
}