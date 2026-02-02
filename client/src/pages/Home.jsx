import { useContext, useEffect, useState } from "react";
import Service from "../components/Service";
import Car from "../components/Car";
import CarType from "../components/CarType";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import arrowImg from "../assets/arrow-removebg-preview (2).png";
import arrowSmallImg from "../assets/arrow-removebg-preview (1).png";
import screenshot1 from "../assets/Screenshot 2025-11-08 120025.png";
import siteLogo from "../assets/site-logo.png";
import bookingImg from "../assets/booking.png";
import pickupImg from "../assets/pick-up.png";
import serviceLogo from "../assets/site-logo-removebg-preview.png";
import service1 from "../assets/Screenshot 2025-11-08 130034.png";
import service2 from "../assets/Screenshot 2025-11-08 130049.png";
import service3 from "../assets/Screenshot 2025-11-08 130101.png";
import service4 from "../assets/Screenshot 2025-11-08 130114.png";
import suvImg from "../assets/pexels-mayday-1545743.jpg";
import hatchbackImg from "../assets/pexels-krislucas90-3264504.jpg";
import sedanImg from "../assets/pexels-markusspiske-103286.jpg";
import downArrow from "../assets/down-arrow.png";
import peopleImg from "../assets/people.png";
import fleet1 from "../assets/Screenshot 2025-11-24 191635.png";
import fleet2 from "../assets/Screenshot 2025-11-24 191649.png";
import fleet3 from "../assets/Screenshot 2025-11-24 191712.png";
import fleet4 from "../assets/Screenshot 2025-11-24 191724.png";
import fleet5 from "../assets/Screenshot 2025-11-24 191735.png";
import faqImg from "../assets/Screenshot 2025-11-25 174359.png";
import bgImage from "../assets/meritt-thomas-BwBxVVdlpYE-unsplash.jpg";
import todayImg from "../assets/Screenshot_2025-11-26_180446-removebg-preview.png";

const Home = () => {
  const [car, setCar] = useState([]);
  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const { curUser } = useContext(UserContext);
  const [book, setBook] = useState(false);

  const API_URL = import.meta.env.VITE_CLIENT_URL + "/api";

  const handleSubmit = (e) => {
    e.preventDefault();
    const { userFullName, userPhoneNumber, userDate, userLocation } = e.target;
    if (userFullName && userPhoneNumber && userDate && userLocation && curUser.length !== 0) {
      e.target.reset();
    } else {
      setBook(true);
    }
  };

  const handleQuestionOne = () => {
    setOne(!one);
    setTwo(false);
    setThree(false);
  };

  const handleQuestionTwo = () => {
    setOne(false);
    setThree(false);
    setTwo(!two);
  };

  const handleQuestionThree = () => {
    setOne(false);
    setTwo(false);
    setThree(!three);
  };

  useEffect(() => {
    document.title = "Novaridde";

    const fetchApi = async () => {
      try {
        const carApi = await fetch(`${API_URL}/cars`);
        const carJson = await carApi.json();
        setCar(carJson);
      } catch (error) {
        console.log(error);
      }
    };

    fetchApi();
  }, []);

  return (
    <>
      <div className="home space-y-32 px-4 sm:px-8 lg:px-14 xl:px-24 max-w-[1400px] mx-auto">
        <div style={{ backgroundImage: `url(${bgImage})`}} className="top animate-fade-down min-h-[650px] sm:min-h-[780px] w-full">
          <h1 className="animate-fade-up">Looking to save more on <br /> your rental car?</h1>
          <p style={{ animationDelay: "150ms" }} className="animate-fade-up">Whether you’re planning a weekend getaway, a business trip, or just need a reliable ride <br />
            for the day, we offers a wide range of vehicles to suit your needs.</p>

          <div style={{ animationDelay: "200ms" }} className="buttons animate-fade-up flex flex-col sm:flex-row items-center gap-4">
            <Link className="book1" to={"/contact"}><button className="book1">Book A Rental</button></Link>
            <div className="learn">
              <Link className="more1" to={"about"}><button className="more1">Learn More</button></Link>
              <Link to={"/about"}><button className="more"><img src={arrowImg} alt="" /></button></Link>
            </div>
          </div>

          <div style={{ animationDelay: "300ms" }} className="search animate-fade-up w-full ">
            <div className="rent">
              <p>Need to Rent a <br /> Luxury Car ?</p>
            </div>

            <form onSubmit={handleSubmit} className="form flex flex-col lg:flex-row flex-wrap gap-6 w-full">
              <div className="name_field flex-1 min-w-[180px]">
                <p>Full Name</p>
                <input type="text" name="userFullName" placeholder="Enter Full Name" required />
              </div>

              <div className="phone_number flex-1 min-w-[180px]">
                <p>Mobile No</p>
                <input type="text" name="userPhoneNumber" placeholder="Enter Phone no." required />
              </div>

              <div className="location flex-1 min-w-[180px]">
                <p>Pickup Location</p>
                <input type="text" name="userLocation" placeholder="Enter Location" required />
              </div>

              <div className="date flex-1 min-w-[180px]">
                <p>Pickup Date</p>
                <input type="date" name="userDate" required />
              </div>

              <div className="send flex-1 min-w-[160px] flex justify-center">
                <button>Send</button>
              </div>
            </form>
          </div>
          <p style={{ display: book ? "block" : "none", color: "red", fontSize: "20px" }}>Create account or login to send information</p>
        </div>

        <div className="search_div animate-fade-up w-full max-w-4xl px-4">
          <h1>Need to Rent a Luxury Car ?</h1>
          <form onSubmit={handleSubmit}>
            <div className="search_one">
              <div id="name">
                <label htmlFor="userName">Full Name</label> <br />
                <input type="text" name="userFullName" id="userName" placeholder="Enter Your Name" required />
              </div>
              <div id="phone">
                <label htmlFor="phone">Mobile No</label> <br />
                <input type="text" name="userPhoneNumber" id="userPhone" placeholder="Enter Phone no." required />
              </div>
            </div>
            <div className="search_second">
              <div id="location">
                <label htmlFor="location">Pickup location</label> <br />
                <input type="text" name="userLocation" id="location" placeholder="Enter Location" required />
              </div>
              <div id="date">
                <label htmlFor="date">Pickup Date</label> <br />
                <input type="text" name="pick" id="pick" required />
              </div>
            </div>
            <button className="send_button">Send</button>
          </form>
        </div>

        <div className="about-us flex flex-col xl:flex-row gap-10 items-center">
          <div className="left_us animate-fade-up">
            <img className="animate-float" src={screenshot1} alt="" />
          </div>
          <div style={{ animationDelay: "150ms" }} className="right_us animate-fade-up w-full xl:w-1/2">
            <div className="title">
              <img src={siteLogo} alt="" />
              <p>About Us</p>
            </div>

            <h1>Your trusted partner in <br /> reliable car rental</h1>
            <p className="la">Aqestic Optio Amet A Ququam Saepe Aliquid Voluate Dicta Fuga Dolor Saerror Sed <br /> Earum A Magni Soluta Quam Minus Dolor Dolor</p>

            <div className="booking_info">
              <img src={bookingImg} alt="" />
              <div className="booking_title">
                <p className="process">Easy Booking Process</p>
                <p className="booking_text">We Have Optimized The Booking Process So That Our Clients Can <br /> Experience The Easiest And The Safest Service</p>
              </div>
            </div>

            <div className="pick_up">
              <img src={pickupImg} alt="" />
              <div className="pickup_title">
                <p style={{ fontSize: 20, fontWeight: 500 }}>Convenient Pick-Up & Return Process</p>
                <p style={{ color: "rgba(128, 128, 128, 0.752", marginTop: 20, lineHeight: "25px" }}>We Have Optimized The Booking Process So That Our Clients Can <br /> Experience The Easiest And The Safest Service</p>
              </div>
            </div>

            <div className="contact_us">
              <Link className="contact" to={"contact"}><button className="contact">Contact Us</button></Link>
              <Link to={"contact"}><button className="contact1"><img src={arrowSmallImg} alt="" /></button></Link>
            </div>
          </div>
        </div>

        <div className="service animate-fade-up w-full px-2 sm:px-4">
          <div className="service_title">
            <img src={serviceLogo} alt="" />
            <p>Our Services</p>
          </div>
          <h1>Explore our wide range of <br /> rental services</h1>
          <div className="services grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
            {[service1, service2, service3, service4].map((img, idx) => (
              <Service key={idx} image={img} title={["Car Rental With Driver", "Business Car Rental", "Airport Transfer", "Chauffeur Services"][idx]} text="Enhance your rental experience with additional options." delay={idx * 100} />
            ))}
          </div>
          <p className="service_info">Discover our range of car rental services designed to meet all your travel needs. <br /> From a diverse fleet of vehicles to flexible rental plans.</p>
          <div className="view">
            <Link className="serv" to={"/services"}><button className="serv">View All Service</button></Link>
            <Link to={"/services"}><button className="serv1"><img src={arrowSmallImg} alt="" /></button></Link>
          </div>
        </div>

        <div className="fleet animate-fade-up">
          <div className="fleet_title">
            <img src={serviceLogo} alt="" />
            <p>Our Fleets</p>
          </div>
          <h1 className="fleet_h1">Explore our perfect and <br /> extensive fleet</h1>
          <div className="scroller">
            <div className="cars">
              {car.map((el, idx) => <Car key={`${el._id}-main`} delay={idx * 120} car={el} />)}
            </div>
            <div aria-hidden className="cars">
              {car.map((el, idx) => <Car key={`${el._id}-ghost-${idx}`} delay={idx * 120} car={el} />)}
            </div>
          </div>

          <div className="car_types flex flex-col lg:flex-row gap-6 w-full">
            {[{image: suvImg, title: "SUV Car"}, {image: hatchbackImg, title:"Hatchback Car"}, {image: sedanImg, title:"Sedan Car"}].map((item, idx) => (
              <CarType key={item.title} delay={idx * 150} car={car} image={item.image} title={item.title} />
            ))}
          </div>
        </div>

        <div className="work animate-fade-up flex flex-col lg:flex-row gap-12 items-center">
          <div className="work_left">
            <div className="work_title">
              <img src={serviceLogo} alt="" />
              <p style={{ color: "rgb(255, 45, 45)" }}>How It Work</p>
            </div>
            <h1>Streamlined processes for <br /> ahassle-free experience</h1>
            <p style={{ marginTop: 30, color: "rgb(130, 130, 130)", lineHeight: "25px" }}>Our streamlined process ensures a seamless car rental experience from start <br /> to finish. With easy online booking, flexible pick-up and drop-off options.</p>

            <div className="question">
              {[one, two, three].map((active, index) => (
                <div className="one" key={index}>
                  <div onClick={[handleQuestionOne, handleQuestionTwo, handleQuestionThree][index]} className="lf">
                    <div className="tx">
                      <p className="font-bold" style={{ fontSize: "22px" }}>{index + 1}.</p>
                      <p className="transition-all duration-500" style={{ fontSize: "22px" }}>{["Browse And Select", "Book And Confirm", "Book And Enjoy"][index]}</p>
                    </div>
                    <img style={{ rotate: active ? "180deg" : "0deg" }} src={downArrow} alt="" />
                  </div>
                  <p className={active ? `answer_${index + 1}` : ""} style={{ display: active ? "block" : "none", fontSize: "16px", color: "rgb(130, 130, 130)", lineHeight: "25px" }}>
                    Explore our diverse selection of high-end vehicles, choose your preferred <br />
                    pickup and return dates, and select a location that best fits your needs
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="work_right animate-float">
            <img className="animate-zoom-rotate" src={peopleImg} alt="" />
          </div>
        </div>

        <div className="choose animate-fade-up">
          <div className="choose_title">
            <img src={serviceLogo} alt="" />
            <p>Why Choose Us</p>
          </div>
          <h1>Unmatched quality and service <br /> for your needs</h1>
          <div className="choose_bottom">
            <div className="choose_left">
              <div className="fleet_op">
                <img src={fleet1} alt="" />
                <div className="op_right">
                  <h1>Extensive Fleet Options</h1>
                  <p>Quisque Sollicitudin Feugiat Risus, Eu Posuere <br /> Ex Euismod Eu. Phasellus Hendrerit, Massa</p>
                </div>
              </div>
              <div className="ser">
                <img src={fleet2} alt="" />
                <div className="ser_right">
                  <h1>Exceptional Customer Service</h1>
                  <p>Quisque Sollicitudin Feugiat Risus, Eu Posuere <br /> Ex Euismod Eu. Phasellus Hendrerit, Massa</p>
                </div>
              </div>
            </div>

            <div className="choose_middle">
              <img src={fleet3} alt="" />
            </div>

            <div className="choose_right">
              <div className="fleet_op">
                <img src={fleet4} alt="" />
                <div className="op_right">
                  <h1 style={{ marginLeft: "-120px" }}>Convenient Locations</h1>
                  <p>Quisque Sollicitudin Feugiat Risus, Eu Posuere <br /> Ex Euismod Eu. Phasellus Hendrerit, Massa</p>
                </div>
              </div>
              <div className="ser">
                <img src={fleet5} alt="" />
                <div className="ser_right">
                  <h1 style={{ marginLeft: "-120px" }}>Reliability And Safety</h1>
                  <p>Quisque Sollicitudin Feugiat Risus, Eu Posuere <br /> Ex Euismod Eu. Phasellus Hendrerit, Massa</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="our_service animate-fade-up">
          <div className="our_left animate-slide-right">
            <img className="animate-zoom-rotate" src={faqImg} alt="" />
          </div>
          <div className="our_right animate-slide-left">
            <div className="our_title">
              <img src={serviceLogo} alt="" />
              <p>Frequently Asked Questions</p>
            </div>

            <h1>Everything you need to <br /> know about our services</h1>

            <div className="our_question">
              {[one, two, three].map((active, index) => (
                <div className="one" key={index}>
                  <div onClick={[handleQuestionOne, handleQuestionTwo, handleQuestionThree][index]} className="lf">
                    <div className="tx">
                      <p style={{ fontSize: "20px", fontWeight: 500 }}>
                        {["What Do I Need To Rent A Car?", "How Old Do I Need To Be To Rent A Car?", "Can I Rent A Car With A Debit Card?"][index]}
                      </p>
                    </div>
                    <img style={{ rotate: active ? "180deg" : "0deg" }} src={downArrow} alt="" />
                  </div>
                  <p className={active ? `answer_${index + 1}` : ""} style={{ display: active ? "block" : "none", fontSize: "16px", color: "rgb(130, 130, 130)", lineHeight: "25px" }}>
                    Explore our diverse selection of high-end vehicles, choose your preferred <br />
                    pickup and return dates, and select a location that best fits your needs
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="today animate-fade-up">
          <div className="today_left">
            <h1>Ready to hit the road? <br /> Book your car today !</h1>
            <p>Our friendly customer service team is here to help. Contact us <br /> anytime for support and inquiries.</p>

            <div className="today_contact">
              <Link to={"/contact"} className="td1"><button className="td1">Contact Us</button></Link>
              <Link to={"/contact"}><button className="td2"><img src={arrowSmallImg} alt="" /></button></Link>
            </div>
          </div>

          <div className="today_right animate-float">
            <img className="animate-zoom-rotate" src={todayImg} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
