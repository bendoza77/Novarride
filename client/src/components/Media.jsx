import { memo } from "react";
import { Link } from "react-scroll";

const Media = memo(({image}) => {

    return (
        <>
            <Link to="home" smooth={true} duration={200}><div className="media animate-scale-in hover:animate-pulse-glow transition-all duration-500">
                <img className="animate-float" src={image} alt="" />
            </div></Link>
        </>
    );


})

export default Media