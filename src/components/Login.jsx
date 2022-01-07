import { useState } from "react/cjs/react.development";
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Footer from "./Footer";

export default function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const history = useNavigate();

    const doLogin = () => {
        let form = {
            "username": userName,
            "password": password
        }
        try {
            fetch('http://localhost:5000/login/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })
                .then(function (response) {
                    return response.json();
                })
                .then((result) => {
                    if (result && result.message === "Success") {
                        history("/");
                    }
                    else {
                        setLoginError(true);
                    }
                });
        }
        catch (e) {
            console.error(e);
            setLoginError(true);
        }
    }

    return (
        <>
            <div className="bg login">
                {(loginError) ?
                    <div className="feedback-login">
                        <p>
                            Usuário ou senha incorretos
                        </p>
                    </div>
                    :
                    <>
                    </>}
                <div className="login-overlay">
                    <img className="logo-login"
                        src="https://lh6.googleusercontent.com/erG9Sr8SsJPgrdaKaMJUImpbszuLemAmaNEaavvqe6qAdsvFAmXM9j4LzSefJFMMETO7LgDlJ3Qh3Seb_F6tRlJFuj9MExy3H8XgDrs3KZCipZkICQ89BC4KWNyTwA17nL7E5yp4"
                        alt="logo"
                    ></img>
                    <label className="login-label" htmlFor="user">Usuário</label>
                    <input type="hidden" className="login-inpt" type="text" id="user" name="user" onKeyUp={event => {
                        setUserName(event.target.value)
                    }} />
                    <label className="login-label" htmlFor="pass">Senha</label>
                    <input type="hidden" className="login-inpt" type="password" id="pass" name="pass" onKeyUp={event => {
                        setPassword(event.target.value)
                    }} />
                    <button type="submit" value="login" className="btn-add-to-cart" onClick={doLogin}>Entrar</button>
                    <Link to='/register'>
                        <button type="submit" value="login" className="btn-add-to-cart">Cadastrar-se</button>
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    )
}