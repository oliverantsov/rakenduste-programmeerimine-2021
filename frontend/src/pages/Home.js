import ItemList from "../components/ItemList";
import { useState, useEffect } from 'react';

function Home() {
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
    
    

    if(isLoading) {
        return (<div>Loading...</div>);
    }

    return (
        <div>
            <ItemList isAddToCart={true} items={loadedItems}/>
        </div>
    )
}

export default Home;