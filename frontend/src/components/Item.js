import { Link } from "react-router-dom";
import './Item.css';

function Item(props) {
    function handleDelete(itemId) {
        props.deleteItem(itemId);
    }

    return (
        <div>
            { props.isSingleItemView ? 
            <div>
                <div className="itemName">{props.name}</div>
                <div className="itemPrice">{props.price}</div>
                <div className="itemCategory">{props.category}</div>
            </div> : 
            <Link to={`item/${props.id}`}>
                <div className="itemName">{props.name}</div>
                <div className="itemPrice">{props.price}</div>
                <div className="itemCategory">{props.category}</div>
            </Link> }
            { props.isAddToCartButton ? <button className="greenButton">Lisa ostukorvi</button> : 
                        <div>
                            <button onClick={()=>handleDelete(props.id)} className="redButton">X</button>
                            <Link to={`edit-item/${props.id}`}>
                                <button className="yellowButton">Muuda toode</button>
                            </Link>
                        </div> }
        </div>
    )
}

export default Item;