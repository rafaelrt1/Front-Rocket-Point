import Header from "./Header";
import Footer from "./Footer";
import { formatPrice } from "../Utils";
import { Link } from "react-router-dom";

export default function Product(props) {
    const products = props.products;

    return (
        <>
            <Header />
            <div className="bg">
                {products.map((item, index) => (
                    <div key={index} className="product-card">
                        <img alt={item.name} src={item.img} className="product-img"></img>
                        <p className="product-name">{item.name}</p>
                        <h5 className="product-list-price">
                            {formatPrice(item.listPrice)}
                        </h5>
                        <h2 className="product-sale-price">
                            {formatPrice(item.salePrice)}
                        </h2>
                        <Link to={"details/" + item._id} target="_blank" rel="noopener noreferrer" params={item._id} >
                            <button
                                className="btn-add-to-cart see-details"
                            >Ver detalhes
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
}
