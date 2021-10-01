import './AddCategoryForm.css';
import { useRef } from 'react';

function AddCategoryForm(props) {
    const nameInputRef = useRef();
    const categoryTypeInputRef = useRef();

    function formSubmitHandler(e) {
        e.preventDefault();

        const nameValue = nameInputRef.current.value;
        const categoryTypeValue = categoryTypeInputRef.current.value;
        
        const category = {
            name: nameValue,
            categoryType: categoryTypeValue
        }

        props.onAddCategory(category);
    }

    return (
        <form onSubmit={formSubmitHandler}>
            <label>Kategooria nimi</label><br />
            <input type="text" placeholder="Nimi" required ref={nameInputRef} /><br />
            <label>Kategooria tüüp</label><br />
            <select required ref={categoryTypeInputRef}> 
                <option>PREMIUM</option>
                <option>DELUXE</option>
                <option>BASIC</option>
            </select><br />
            <br />
            <button>Sisesta uus kategooria</button>
        </form>
    );
}

export default AddCategoryForm;