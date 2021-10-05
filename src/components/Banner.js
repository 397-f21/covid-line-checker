import logo from "../assets/images/NUlogo.jpeg";
import './Banner.css'

const Banner = () => {
    return (
        <>
            <div className="banner">
                <ul>
                    <li>
                        <img
                            src={logo}
                            alt="Northwestern Logo"
                        />
                    </li>
                    <li className="topic">
                        <span>NU Covid-19 Test Line Checker</span>
                    </li>
                </ul>
            </div>
        </>
    )
}
export default Banner