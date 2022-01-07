import Footer from "./Footer";
import InputMask from 'react-input-mask';
import { useState } from "react";
import { use } from "express/lib/router";
import Header from "./Header";

export default function Register() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [cep, setCep] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');

    const validateRegister = () => {
        let userObj = {
            "username": userName,
            "firstName": firstName,
            "lastName": lastName,
            "cellphone": Number(cellphone.split('(').join('').split(')').join('').split(' ').join('').split('-').join('')),
            "cep": Number(cep.split('-').join('')),
            "city": city,
            "email": email,
            "password": password,
            "address": address,
            "number": number
        }

        try {
            fetch('http://localhost:5000/register/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userObj)
            })
                .then(function (response) {
                    return response.json();
                })
                .then((result) => {
                });
        }
        catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <Header />
            <div className="bg register">
                <div className="register-overlay">
                    <label className="register-label" htmlFor="user-name">Nome de Usuário</label>
                    <input type="hidden" className="register-inpt" type="text" id="user-name" name="user-name" onKeyUp={event => {
                        setUserName(event.target.value);
                    }} />
                    <label className="register-label" htmlFor="name">Nome</label>
                    <input type="hidden" className="register-inpt" type="text" id="name" name="name" onKeyUp={event => {
                        setFirstName(event.target.value);
                    }} />
                    <label className="register-label" htmlFor="last-name">Sobrenome</label>
                    <input type="hidden" className="register-inpt" type="text" id="last-name" name="last-name" onKeyUp={event => {
                        setLastName(event.target.value);
                    }} />
                    <label className="register-label" htmlFor="cellphone">Celular</label>
                    <InputMask type="hidden" className="register-inpt" type="tel" id="cellphone" name="cellphone" mask="(99) 99999-9999" onKeyUp={event => {
                        setCellphone(event.target.value);
                    }}>
                    </InputMask>
                    <label className="register-label" htmlFor="cep">CEP</label>
                    <InputMask type="hidden" className="register-inpt" type="text" id="cep" name="cep" mask="99999-999" onKeyUp={event => {
                        setCep(event.target.value);
                    }}>
                    </InputMask>
                    <label className="register-label" htmlFor="city">Cidade</label>
                    <input type="hidden" className="register-inpt" type="text" id="city" name="city" onKeyUp={event => {
                        setCity(event.target.value);
                    }} />
                    <label className="register-label" htmlFor="e-mail">E-mail</label>
                    <input type="hidden" className="register-inpt" type="e-mail" id="e-mail" name="e-mail" onKeyUp={event => {
                        setEmail(event.target.value);
                    }} />
                    <label className="register-label" htmlFor="pass">Senha</label>
                    <input type="hidden" className="register-inpt" type="password" id="pass" name="pass" onKeyUp={event => {
                        setPassword(event.target.value);
                    }} />
                    <label className="register-label" htmlFor="address">Endereço</label>
                    <input type="hidden" className="register-inpt" type="text" id="address" name="address" onKeyUp={event => {
                        setAddress(event.target.value);
                    }} />
                    <label className="register-label" htmlFor="number">Número</label>
                    <input type="hidden" className="register-inpt" type="text" id="number" name="number" onKeyUp={event => {
                        setNumber(event.target.value);
                    }} />
                    <button type="submit" value="login" className="btn-add-to-cart" onClick={validateRegister}>Cadastrar</button>
                </div>
                <img className="logo-register"
                    src="https://lh6.googleusercontent.com/erG9Sr8SsJPgrdaKaMJUImpbszuLemAmaNEaavvqe6qAdsvFAmXM9j4LzSefJFMMETO7LgDlJ3Qh3Seb_F6tRlJFuj9MExy3H8XgDrs3KZCipZkICQ89BC4KWNyTwA17nL7E5yp4"
                    alt="logo"
                ></img>
            </div>
            <Footer />
        </>
    )
}