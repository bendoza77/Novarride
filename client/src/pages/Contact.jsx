import { Link } from "react-router-dom";

import phoneImg from "../assets/phone.png";
import randomImg from "../assets/random.png";
import sendImg from "../assets/send.png";

const Contact = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const { userName, userLastName, userEmail, userPhone } = e.target

        if (userName.value && userLastName.value && userEmail.value && userPhone.value) {
            e.target.reset();
        }
    }

    return (
        <>
            <div className="contact_div">
                <div className="about_top">
                    <h1>Contact Us</h1>
                    <div className="about_nav">
                        <Link to={"/"}><p className="about_home">Home</p></Link>
                        <p>/</p>
                        <p className="place">Contact Us</p>
                    </div>
                </div>

                <div className="contact_bottom">
                    <div className="contact_left">
                        <h1>Contact information</h1>
                        <p>Say something to start a live chat!</p>

                        <img src={phoneImg} alt="" />

                        <div className="co">
                            <img src={randomImg} alt="" />
                        </div>
                    </div>

                    <div className="contact_right">
                        <form onSubmit={handleSubmit}>
                            <div className="co1">
                                <div className="first_name">
                                    <label htmlFor="userName">First Name</label> <br />
                                    <input type="text" name="userName" id="userName" placeholder="Enter Your Name" required />
                                </div>

                                <div className="last_name">
                                    <label htmlFor="userLastName">Last Name</label> <br />
                                    <input type="text" name="userLastName" id="userLastName" placeholder="Enter Your Name" required />
                                </div>
                            </div>

                            <div className="co2">
                                <div className="email">
                                    <label htmlFor="userEmail">Email</label> <br />
                                    <input type="text" name="userEmail" id="userEmail" placeholder="Enter Your Email" required />
                                </div>

                                <div className="phone">
                                    <label htmlFor="userPhone">Phone</label> <br />
                                    <input type="text" name="userPhone" id="userPhone" placeholder="Enter Your Number"  required/>
                                </div>
                            </div>

                            <div className="message">
                                <label htmlFor="userMessage">Message</label>
                                <input type="text" name="userMessage" id="userMessage" placeholder="Enter Your Message" />
                            </div>

                            <button>Send Message</button>

                            <img className="send1" src={sendImg} alt="" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contact;
