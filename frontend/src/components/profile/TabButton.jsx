export const TabButton = (props) => {
    
    const handleClick = () => {
        props.setShowComponent(true)
        props.otherComponents.forEach((state) => state(false))
        }


    return (
        <>
            <button name={props.name} value={props.value} onClick={handleClick} className="tabButton">{props.value}</button>
        </>
    )
}