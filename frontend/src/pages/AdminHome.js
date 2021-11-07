import ItemList from "../components/ItemList";
import CategoryList from "../components/CategoryList";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './AdminHome.css';


function AdminHome() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedItems, setLoadedItems] = useState([]);
    const [loadedCategories, setLoadedCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/items').then(res => {
            return res.json();
        }).then(data => {
            console.log(data);
            setIsLoading(false);
            setLoadedItems(data);
        });
        fetch('http://localhost:8080/categories').then(res => {
            return res.json();
        }).then(data => {
            console.log(data);
            setIsLoading(false);
            setLoadedCategories(data);
        });
    },[])
    
    function makeDeleteRequest(itemId) {
        fetch('http://localhost:8080/delete-item/' + itemId,
            { method: 'DELETE' }
        ).then(res => {
            return res.json();
        }).then(data => {
            setIsLoading(false);
            setLoadedItems(data);
        });
    }

    if(isLoading) {
        return (<div>Loading...</div>);
    }

    return (
        <div>
            <Link to="add-item">
                <button className="greenButton">Lisa uus ese</button>
            </Link>
            <ItemList onDeleteItem={makeDeleteRequest} isAddToCart={false} items={loadedItems}/>
            <br />
            <Link to="add-category">
                <button className="greenButton">Lisa uus kategooria</button>
            </Link>
            <CategoryList categories={loadedCategories}/>
        </div>
    )
}

export default AdminHome;