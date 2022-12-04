import {useAuth} from "../Firebase";
import Voucher from "../components/Voucher.jsx"
import Link from "next/link";

const Header = () => {

    const user = useAuth()
    console.log(user)

    const userName = user?.displayName
    const userLogo = user?.photoURL

    return(
<>


        <div className="header">
            <Link href="/vouchers">
                <a></a>
                <div className="header-user">
                    <img alt="user-logo" className="user-logo" src={userLogo}></img>
                    <h3>{userName}</h3>
                </div>
            </Link>



                <div className="balance-wrapper">
                <p className="balance">0</p>
            </div>


            <div className="header-gradient">

            </div>


        </div>

</>
    )
}

export default Header