import whiteLogo from "../../assets/white_logo.png";

const Loading = () => {

    return (
        <>
            <div className="loading animate-scale-in">
                <div className="spiner"></div>
                <img className="animate-pulse-glow" src={whiteLogo} alt="" />
            </div>
        </>
    );
};

export default Loading;
