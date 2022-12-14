import { useAuth, handleLogout } from "../Firebase";
import Voucher from "../components/Voucher.jsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Header = () => {
  const user = useAuth();
  console.log(user);

  const userName = user?.displayName;
  const userLogo = user?.photoURL;

  const router = useRouter();

  return (
    <>
      <div className="header">
        {!!user && (
          <Link href="/vouchers">
            <a></a>
            <div className="header-user">
              <img alt="user-logo" className="user-logo" src={userLogo}></img>
              <h3>{userName}</h3>
            </div>
          </Link>
        )}

        <div className="balance-wrapper">
          <button
            className="text-white"
            onClick={() => {
              handleLogout().then((r) => {
                router.push("/login");
              });
            }}
          >
            Log Out
          </button>
          <p className="balance font-bold">125</p>
        </div>
      </div>
    </>
  );
};

export default Header;
