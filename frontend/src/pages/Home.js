import Item from "../components/Item";

function Home() {
    return (
        <div>
            Tere
                <Item name="Item1" price="10" category="candy"/>
                <Item name="Item2" price="500" category="phone"/>
                <Item name="Item3" price="22500" category="car"/>
        </div>
    )
}

export default Home;