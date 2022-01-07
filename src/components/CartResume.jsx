import { formatPrice } from "../Utils";

export default function CartResume(props) {
    return (
        <>
            {(props.hasItem) ?
                < div className="cart-resume" >
                    <h3 className="total-buy resume">Resumo</h3>
                    {props.productsBuy.map(function (item) {
                        return (
                            <div className="item-buy" key={item._id}>
                                <h3 className="name" >{`${item.qntd}x ${item.name}`}</h3>
                                <h3 className="total">{formatPrice(item.total)}</h3>
                            </div>)
                    })
                    }
                    <h3 className="total-buy">Valor total: {formatPrice(props.total)}</h3>
                    <button className="btn finalize-buy">Finalizar compra</button>
                </div >
                : <></>
            }
        </>
    )
}