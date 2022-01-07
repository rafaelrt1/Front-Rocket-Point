import { useEffect, useState, useContext } from "react";
import { formatPrice } from "../Utils";
import Header from "./Header";
import Footer from "./Footer";
import { CartContext } from "../CartContext";
import NotFound from "./NotFound";

export default function ProductDetails(props) {
    const [product, setProduct] = useState([]);
    const cartQntd = useContext(CartContext);
    const [error, setError] = useState(false);

    async function getProductDetails(props) {
        try {
            const host = 'http://localhost:5000';
            let url = host + window.location.pathname;
            let result = await fetch(url, { mode: 'cors' });
            let product = await result.json();
            if (product && product._id) {
                setProduct(product);
            }
            else {
                setError(true);
            }
        }
        catch (e) {
            console.error(e)
        }
    };

    useEffect(() => {
        getProductDetails();
    }, []);

    function setLocalStorage(item, value) {
        let ls = getLocalStorage(item);
        let itemExist = false;
        if (!ls) {
            ls = [];
        }
        else if (ls) {
            ls = JSON.parse(ls);
            ls.forEach((product, index) => {
                let id = product.id ? product.id : product._id;
                if (product && value._id === id) {
                    itemExist = true;
                    return false;
                }
            })
        }
        if (!itemExist) {
            let v = {
                id: value._id,
                name: value.name,
                qntd: 1
            }
            ls.push(v);
            getTotalItems(ls);
            ls.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });

            ls = JSON.stringify(ls);
            localStorage.setItem(item, ls);
        }
    }

    function getTotalItems(ls) {
        let totalItemsOnCart = 0;
        if (!ls)
            cartQntd.dispatch({ cartQntd: 1 });
        else {
            ls.map(function (item) {
                return totalItemsOnCart += item.qntd;
            })
            cartQntd.dispatch({ cartQntd: totalItemsOnCart });
        }
    }

    function getLocalStorage(item) {
        return localStorage.getItem(item);
    }

    function addToCart(item, bind) {
        setLocalStorage("products", item);
    }

    return (
        <>
            {!error ?
                <>
                    <Header />
                    <div className="bg-details">
                        {
                            product ?
                                <div className="details">
                                    <img className="img-details" alt={product.name} src={product.img} />
                                    <div className="details-info">
                                        <h1>{product.name}</h1>
                                        <h5><s>{formatPrice(product.listPrice)}</s></h5>
                                        <h2>{formatPrice(product.salePrice)}</h2>
                                        <button
                                            className="btn-add-to-cart"
                                            onClick={addToCart.bind(product, product)}
                                        >Adicionar ao carrinho
                                        </button>
                                    </div>
                                </div>
                                : <></>
                        }
                    </div>
                    <Footer />
                </>
                :
                <NotFound />
            }
        </>
    );
}