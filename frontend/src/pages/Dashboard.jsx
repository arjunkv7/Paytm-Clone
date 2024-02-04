import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import axios from "axios";
import { Users } from "../components/Users";


export function Dashboard() {
    const [balance, setBalance] = useState(0);
    const token = localStorage.token;
    useEffect(() => {
        getBalance();
    }, []);

    async function getBalance() {
        let response = await axios.get('http://localhost:3000/api/v1/account/balance', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setBalance(response.data.balance)
    }

    return <>
        <Appbar></Appbar>

        <div className="m-8">
            <Balance value={balance} />
            <Users />
        </div>
    </>
}