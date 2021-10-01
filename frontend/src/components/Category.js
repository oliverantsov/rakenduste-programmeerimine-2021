function Category(props) {
    return (
        <div>
            <div className="categoryName">{props.name}</div>
            <div className="categoryType">{props.categoryType}</div>
        </div>
    )
}

export default Category;