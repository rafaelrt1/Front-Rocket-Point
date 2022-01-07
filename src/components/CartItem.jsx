import { useEffect, useState } from "react";
import { formatPrice } from "../Utils";

export default function CartItem(props) {
    const [contagem, setContagem] = useState(0);

    const [totalProduto, setTotalProduto] = useState(0);

    function atualizaTotalLocal(cont) {
        setTotalProduto(cont * props.salePrice);
    };

    function down() {
        if (contagem > 0) {
            if (contagem === 1) {
                props.update(props, contagem - 1);
                return;
            }
            atualizaTotalLocal(contagem - 1);
            setContagem(contagem - 1);
            props.update(props, contagem - 1);
        }
    };

    function up() {
        setContagem(contagem + 1);
        atualizaTotalLocal(contagem + 1);
        props.update(props, contagem + 1);
    };

    function remove() {
        props.update(props, 0);
    }

    useEffect(() => {
        setTotalProduto(props.quantidade * props.salePrice);
        setContagem(props.quantidade);
    }, [props]);
    return (
        <div className="cart-product" key={props._id}>
            <img
                className="product-img"
                src={props.image}
                alt={props.name}
            ></img>
            <div className="cart-product-info">
                <h1 className="product-name cart">{props.name}</h1>
                <div className="product-qntd-price">
                    <div className="qntd">
                        <button className="btn"
                            onClick={down}
                        >-</button>
                        <p>{contagem}</p>
                        <button className="btn"
                            onClick={up}
                        >+</button>
                    </div>
                    <h1 className="product-sale-price cart">{formatPrice(totalProduto)}</h1>
                </div>
                <button className="remove-item" onClick={remove}>Remover</button>
            </div>
        </div>
    )
}