import whiteLogo from "../../assets/white_logo.png";

const Loading = () => {

    return (
        <>
            <div className="loading">
                <div className="spiner"></div>
                <img src={whiteLogo} alt="" />
            </div>
        </>
    );
};

export default Loading;
