import { memo } from "react";
import { Link } from "react-scroll";

const Media = memo(({image}) => {

    return (
        <>
            <Link to="home" smooth={true} duration={200}><div className="media">
                <img src={image} alt="" />
            </div></Link>
        </>
    );


})

export default Media