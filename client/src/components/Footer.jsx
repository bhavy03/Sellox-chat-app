import logo from "../assets/logo3.svg"
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const Footer = () => {
    return (
        <div>
            <div className="flex p-3 flex-col justify-center">
                <hr className="mx-40 mb-10  border-gray-700" />
                <img src={logo} alt="" className="h-10 object-contain m-4 " />
                {/* <hr className="border-gray-800  mx-40 mt-3"/> */}
                <div className="flex justify-center mt-9">
                    <div className="flex w-[60%] md:space-x-10 justify-evenly my-9 flex-wrap">
                        <div className="md:flex md:flex-row md:space-x-20">
                            <p className="flex md:text-2xl text-lg items-center"><FaXTwitter className="md:text-3xl text-xl mr-2" />Twitter</p>
                            <p className="flex md:text-2xl text-lg items-center"><FaGithub className="md:text-3xl text-xl mr-2" />Github</p>
                        </div>
                        <div className="md:flex md:flex-row md:space-x-20">
                            <p className="flex md:text-2xl text-lg items-center"><FaLinkedin className="md:text-3xl text-xl mr-2" />LinkedIn</p>
                            <p className="flex md:text-2xl text-lg items-center"><SiGmail className="md:text-3xl text-xl mr-2" />Email</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
