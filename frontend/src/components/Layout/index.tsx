import { Link } from "react-router-dom"
import logo from "../../../public/logo.png"
import { FaUsersGear } from "react-icons/fa6";
import { FaBriefcase, FaSignOutAlt } from "react-icons/fa";
import { ReactNode } from "react";

interface IProps {
    children: ReactNode
};

export const Layout = (props: IProps) => {

    return (
        <>
            <div className="flex flex-row">
                <header className="bg-neutral-900 w-72 h-screen text-white flex flex-col justify-between">
                    <div>
                        <div className="flex justify-center align-content-center mt-10">
                            <img style={{ "width": "15em" }} src={logo} alt="logo" draggable="false" />
                        </div>
                        <div className="flex justify-center mt-16">
                            <ul className="nav flex-col">
                                <Link className={`nav-link`} to={'/'}>
                                    <li className="nav-item bg-neutral-800 px-14 py-2 rounded flex flex-row gap-3 items-center justify-start">
                                        <FaUsersGear />
                                        Desenvolvedores
                                    </li>
                                </Link>
                                <Link className={`nav-link`} to={'/niveis'}>
                                    <li className="nav-item bg-neutral-800 px-14 py-2 rounded mt-3 flex flex-row gap-3 items-center justify-start">
                                        <FaBriefcase />
                                        Niveis
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <ul className="flex justify-center mb-3">
                            <Link className={`nav-link`} to={'/signout'}>
                                <li className="nav-item px-16 py-2 rounded border-2 border-neutral-800 flex flex-row gap-3 items-center justify-start">
                                    <FaSignOutAlt />
                                    Desconectar
                                </li>
                            </Link>
                        </ul>
                    </div>
                </header>
                <main>
                    {props.children}
                </main>
            </div>
        </>
    )
}