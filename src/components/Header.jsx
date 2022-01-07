import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext";


export default function Header() {
    const cartItemsQntd = useContext(CartContext).state.cartItemsQntd;
    const [successSearch, setSuccessSearch] = useState(false);
    const [resultSearch, setResultSearch] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const handleChange = (event) => {
        event.preventDefault();
        setSearchValue(event.target.value);

        if (searchValue && searchValue.length >= 3) {
            searchProduct();
        }
        else {
            setSuccessSearch(false);
            setResultSearch([]);
        }
    }

    async function searchProduct() {
        let query = document.getElementById("inptSearch").value;
        let result = await fetch('http://localhost:5000/products/search?product=' + query + '', { mode: 'cors' });
        let response = await result.json();
        if (response && response[0]) {
            setResultSearch(response);
            setSuccessSearch(true);
        }
        else {
            setSuccessSearch(false);
            setResultSearch([]);
        }
    }

    return (
        <div className="header">
            <Link to="/">
                <img className="logo"
                    src="https://lh6.googleusercontent.com/erG9Sr8SsJPgrdaKaMJUImpbszuLemAmaNEaavvqe6qAdsvFAmXM9j4LzSefJFMMETO7LgDlJ3Qh3Seb_F6tRlJFuj9MExy3H8XgDrs3KZCipZkICQ89BC4KWNyTwA17nL7E5yp4"
                    alt="logo"
                ></img>
            </Link>
            <div className="search-and-result-box">
                <div className="head busca">
                    <input name="inptSearch" className="inpt-busca" id="inptSearch" type="text" placeholder="Buscar produto" value={searchValue}
                        onFocus={event => {
                            setSuccessSearch(true);
                            handleChange(event)
                        }}
                        onChange={event => {
                            setSearchValue(event.target.value);
                            handleChange(event);
                        }} ></input>
                    <button className="btn">
                        <img className="icon icon-search" src="https://icones.pro/wp-content/uploads/2021/06/icone-loupe-noir.png"
                            alt="ícone busca"></img>
                    </button>
                </div>
                {successSearch && resultSearch[0] && resultSearch[0].name ?
                    <ul className="result-list">
                        {resultSearch.map(function (item) {
                            return (
                                <Link key={item._id} to={"/details/" + item._id} target="_blank" rel="noopener noreferrer" params={item._id} >
                                    <li key={item._id} className="result-item">{item.name}</li>
                                </Link>
                            )
                        })
                        }
                    </ul>
                    : <>
                    </>}
            </div>
            <Link className="header-option" to="/login">
                <div>
                    <img
                        className="icon icon-user"
                        src="https://cdn3.iconfinder.com/data/icons/business-finance-line-5/32/client-2-512.png"
                        alt="ícone usuário"
                    ></img>
                    <p>Login</p>
                </div>
            </Link>
            <Link className="header-option" to="/cart">
                <div>
                    <img
                        className="icon icon-cart"
                        src="https://image.flaticon.com/icons/png/512/57/57451.png"
                        alt="ícone carrinho"
                    ></img>
                    {cartItemsQntd > 0 ?
                        <span className="qntd-cart-items">{cartItemsQntd}</span> :
                        <></>}
                    <p>Carrinho</p>
                </div>
            </Link>
        </div>
    );
}
