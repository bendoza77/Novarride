import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CarContext } from "../context/CarContext";
import { UserContext } from "../context/UserContext";

import doorIcon from "../assets/door_info.png";
import passengerIcon from "../assets/Screenshot 2025-12-03 162945.png";
import transmissionIcon from "../assets/Screenshot 2025-12-03 162955.png";
import ageIcon from "../assets/Screenshot 2025-12-03 163014.png";
import luggageIcon from "../assets/Screenshot 2025-12-03 163026.png";
import airConditionIcon from "../assets/Screenshot 2025-12-03 163040.png";
import arrowIcon from "../assets/arrow-removebg-preview (1).png";
import screenIcon from "../assets/screen.png";
import siteLogo from "../assets/site-logo-removebg-preview.png";
import generalImg from "../assets/general.png";
import amenitiesImg from "../assets/ametides.png";
import plusIcon from "../assets/plus.png";
import minusIcon from "../assets/minus.png";
import bg from "../assets/pexels-thephotosaccount-30664842.jpg";

const Car = () => {
  const { carInfo } = useContext(CarContext);
  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [four, setFour] = useState(false);
  const [five, setFive] = useState(false);
  const [six, setSix] = useState(false);
  const [book, setBook] = useState("");
  const { curUser } = useContext(UserContext);

  const handleBook = () => {
    if (curUser.email === undefined) {
      setBook("notuser");
    } else {
      setBook("user");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, dateStart, dateEnd } = e.target;
    if (name.value && email.value && phone.value && dateStart.value && dateEnd.value) {
      setBook(false);
      e.target.reset();
    }
  };

  const handleQuestion = (num) => {
    setOne(num === 1 ? !one : false);
    setTwo(num === 2 ? !two : false);
    setThree(num === 3 ? !three : false);
    setFour(num === 4 ? !four : false);
    setFive(num === 5 ? !five : false);
    setSix(num === 6 ? !six : false);
  };

  return (
    <>
      <div className={book === "user" ? "layer" : ""}></div>
      <div style={{ display: book === "user" ? "block" : "none" }} className="book_car">
        <div className="bo">
          <div className="book_title">
            <h1>Reserve your vehicle today!</h1>
            <p>Fill out the form below to reserve your vehicle. Complete the necessary details to ensure a smooth rental experience.</p>
          </div>
          <p onClick={() => setBook(false)} style={{ fontSize: "17px", cursor: "pointer" }}>x</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="name">
            <input type="text" name="name" placeholder="Enter Full Name" required />
            <input type="email" name="email" placeholder="Enter Your Email" required />
          </div>
          <div className="phone">
            <input type="text" name="phone" placeholder="Enter Phone Number" required />
          </div>
          <div className="date1">
            <input type="date" name="dateStart" required />
            <input type="date" name="dateEnd" required />
          </div>
          <div className="mes">
            <input type="text" name="message" placeholder="Enter Your Message" />
          </div>
          <button>Send</button>
        </form>
      </div>

      <div className="car">
        <div style={{backgroundImage: `url(${bg})`}} className="about_top">
          <h1>{carInfo.title}</h1>
          <div className="about_nav">
            <Link to={"/"}><p className="about_home">Home</p></Link>
            <p>/</p>
            <Link to={"/cars"}><p className="place1">Cars</p></Link>
            <p>/</p>
            <p style={{ color: "rgb(255, 45, 45)" }}>{carInfo.title}</p>
          </div>
        </div>

        <div className="car_info">
          <div className="car_left">
            <div className="car_price">
              <p><span>${carInfo.pricePerDay}</span>/PerDay</p>
            </div>
            <div className="car_bottom">
              <div className="cs">
                <div className="cf">
                  <img src={doorIcon} alt="" />
                  <p>Doors</p>
                </div>
                <p className="num">{carInfo.doors}</p>
              </div>
              <div className="cs">
                <div className="cf">
                  <img src={passengerIcon} alt="" />
                  <p>Passengers</p>
                </div>
                <p className="num">{carInfo.passengers}</p>
              </div>
              <div className="cs">
                <div className="cf">
                  <img src={transmissionIcon} alt="" />
                  <p>Transmission</p>
                </div>
                <p className="num">{carInfo.transmission}</p>
              </div>
              <div className="cs">
                <div className="cf">
                  <img src={ageIcon} alt="" />
                  <p>Age</p>
                </div>
                <p className="num">{carInfo.age}</p>
              </div>
              <div className="cs">
                <div className="cf">
                  <img src={luggageIcon} alt="" />
                  <p>Luggage</p>
                </div>
                <p className="num">{carInfo.luggage}</p>
              </div>
              <div className="cs">
                <div className="cf">
                  <img src={airConditionIcon} alt="" />
                  <p>Air Condition</p>
                </div>
                <p className="num">{carInfo.airCondition}</p>
              </div>
            </div>

            <div className="car_buttons">
              <button onClick={handleBook} className="cr1">Book Now</button>
              <button onClick={handleBook} className="cr2">
                <img src={arrowIcon} alt="" />
              </button>
            </div>
            <p style={{ display: book === "notuser" ? "block" : "none" }} className="alert">
              Create account or login to book car
            </p>
          </div>

          <div className="car_right">
            <div className="car_image">
              <img src={carInfo.image} alt="" />
            </div>
            <img className="screen1" src={screenIcon} alt="" />

            <div className="general">
              <div className="general_title">
                <img src={siteLogo} alt="" />
                <p>General Information</p>
              </div>
              <h1>Know about our car service</h1>
              <p className="general_info">Lorem pretium fermentum quam, sit amet cursus ante sollicitudin velen morbi consesua the miss sustion consation porttitor orci sit amet iaculis nisan. Lorem pretium fermentum quam sit amet cursus ante sollicitudin velen fermen morbinetion consesua the risus consequation the porttiton.</p>
              <img className="general_image" src={generalImg} alt="" />
            </div>

            <div style={{ marginTop: "100px" }} className="general">
              <div className="general_title">
                <img src={siteLogo} alt="" />
                <p>Amenities</p>
              </div>
              <h1>Premium amenities and features</h1>
              <img className="ametides_image" src={amenitiesImg} alt="" />
            </div>

            <div className="rental_condition">
              <div className="general_title">
                <img src={siteLogo} alt="" />
                <p>Rental Conditions</p>
              </div>
              <h1>Policies and agreement</h1>

              <div className="agreement">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={num} onClick={() => handleQuestion(num)} className={`que ${[one, two, three, four, five, six][num-1] ? "que1" : "que11"}`}>
                    <div className="as">
                      <p>{
                        ["Driver's License Requirements","Insurance and Coverage policy","Available payment Methods","Cancellation and Modification policy","Smoking and Pet Policies","The minimum age Requirements"][num-1]
                      }</p>
                      <img src={[plusIcon, minusIcon][[one, two, three, four, five, six][num-1] ? 1 : 0]} alt="" />
                    </div>
                    <div className="ans" style={{ display: [one, two, three, four, five, six][num-1] ? "block" : "none" }}>
                      <p>It is a long established fact that a reader will be distracted by the readable content of a page when <br /> 
                        looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Car;
