import {useAuth} from "../Firebase";

const Header = () => {

    const user = useAuth()
    console.log(user)

    const userName = user?.displayName
    const userLogo = user?.photoURL

    return(



        <div className="header">
            <div className="header-user">
                <img alt="user-logo" className="user-logo" src={userLogo}></img>
                <h3>{userName}</h3>
            </div>

            <div className="balance-wrapper">

                <p className="balance">0</p>

            </div>

        </div>
    )
}

export default Header