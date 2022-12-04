import Voucher from "../components/Voucher";
import {useEffect, useState} from "react";
import Link from "next/link";
import Header from "../components/Header";

const vouchers = () => {

    const serverUrl = "https://json-server-nine-beige.vercel.app/api";
    const [vouchers, setVouchers] = useState([]);
    const fetchVouchers = async () => {
        const response = await fetch(`${serverUrl}/vouchers`);
        const data = await response.json();

        console.log(data)

        return data;
    };

    useEffect(() => {
        fetchVouchers().then((data) => {
            setVouchers(data)
        });
    }, []);

    return(
        <div className="voucher-page">
            <Link href="/">
                <a></a>
                <div className="back-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>

                </div>
            </Link>

            {vouchers.map((voucher) => {
                return <Voucher voucher={voucher}/>
            })}
        </div>
    )
}

export default vouchers;