import { useEffect, useState, useContext } from "react";
import Header from "./Header";
import CartItem from "./CartItem";
import CartResume from "./CartResume";
import Footer from "./Footer";
import { CartContext } from "../CartContext";

export default function Cart() {
    const [hasItem, setHasItem] = useState(false);
    const [cartProducts, setCartProducts] = useState([]);
    const [totalBuy, setTotalBuy] = useState(0);
    const savedProducts = [];
    const cartQntd = useContext(CartContext);

    function calculateTotal(savedProducts) {
        let totalGeral = 0;
        if (savedProducts) {
            savedProducts.map((item) => {
                return totalGeral += item.qntd * item.salePrice;
            });
            setTotalBuy(totalGeral);
            savedProducts.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
            setCartProducts(savedProducts);
            let totalItemsQntd = 0;
            savedProducts.map(function (item) {
                return totalItemsQntd += item.qntd;
            })
            cartQntd.dispatch({ cartQntd: totalItemsQntd });
            savedProducts = JSON.stringify(savedProducts);
            localStorage.clear();
            localStorage.setItem("products", savedProducts);
        } else {
            setTotalBuy(0);
            setHasItem(false);
        }
    };

    const getProcucts = (id, item) => {
        try {
            fetch('http://localhost:5000/details/' + id)
                .then(function (response) {
                    return response.json();
                })
                .then((product) => {
                    let total = 0;
                    total = total + (item.qntd * product.salePrice);
                    product.total = total;
                    product.qntd = item.qntd;
                    savedProducts.push(product);
                    calculateTotal(savedProducts);
                });
        }
        catch (e) {
            console.error(e);
        }
    };

    const checkLocalStorage = () => {
        let items = localStorage.getItem("products");
        items = JSON.parse(items);

        if (!items) {
            return setHasItem(false);
        }
        items.map(function (item) {
            let id = item.id ? item.id : item._id;
            setHasItem(true);
            return getProcucts(id, item);
        });
    };

    useEffect(() => {
        checkLocalStorage();
    }, []);

    function atualizaProduto(item, qntd) {
        let id = item.id;
        let novoProd = cartProducts;

        let filteredProduct = novoProd.filter(function (item) {
            return item._id === id;
        });

        let otherItems = novoProd.filter(function (item) {
            return item._id !== id;
        });

        filteredProduct[0].qntd = qntd;
        otherItems.push(filteredProduct[0]);

        let productsUpdated = otherItems;

        let prod = productsUpdated.filter(function (item) {
            return item.qntd !== 0;
        });

        prod.map(function (item) {
            let total = 0;
            total = total + (item.qntd * item.salePrice);
            return item.total = total;
        });

        if (prod.length === 0) {
            setHasItem(false);
        }
        calculateTotal(prod);
    };

    return (
        <>
            <Header />

            {!hasItem ?
                <div className="empty-cart">
                    <h1 className="empty-cart-text">Ainda não existem itens no seu carrinho</h1>
                </div>
                :
                <div className="bg bg-cart" >
                    <div className="cart-products">
                        {cartProducts.map((item, index) => (
                            < CartItem
                                key={index}
                                id={item._id}
                                image={item.img}
                                name={item.name}
                                salePrice={item.salePrice}
                                listPrice={item.listPrice}
                                quantidade={item.qntd}
                                hasItem={hasItem}
                                update={atualizaProduto}
                                calculateTotal={calculateTotal}
                            />
                        ))
                        }
                    </div>
                    <CartResume total={totalBuy} productsBuy={cartProducts} hasItem={hasItem} />
                </div >
            }
            <Footer />
        </>
    );
}