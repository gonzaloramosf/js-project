const Database = () => {
    const items = [
        {
            id: 1,
            title: 'Peugeot 308',
            price: 1800000, 
            detailPage: "itemPage.html",
        },
        {
            id: 2,
            title: 'Peugeot 208',
            price: 2200000,
            detailPage: "itemPage.html", 
        },
        {
            id: 3,
            title: 'Peugeot 307',
            price: 1000000, 
            detailPage: "itemPage.html",
        }
    ];

    ShowItems(items);
}

const ShowItems = (items) => {
    // calling section for items in html 
    const itemsContainer = document.querySelector(".items");

    items.forEach((item) => {
        // item features container
        let itemContainer = document.createElement("div");
        itemContainer.className = "card item";

        // adding item.title
        let itemTitle = document.createElement("h4");
        itemTitle.textContent= `${item.title}`;
        
        // adding item.img

        // adding ite.price
        let itemPrice = document.createElement("span");
        itemPrice.textContent = `${item.price}`;

        // button product page
        let itemButton = document.createElement("button");
        itemButton.textContent = "View details";
        // navigate to product page
        itemButton.addEventListener("click", () => {
            Item(item);
            console.log('ocu pado');
        });

        // adding features
        itemContainer.appendChild(itemTitle);
        // item.img
        itemContainer.appendChild(itemPrice);
        itemContainer.appendChild(itemButton);

        // itemContainer whit all features
        itemsContainer.appendChild(itemContainer);
    })
}

const Item = (item) => {

    // calling section for item in html 
    const itemDetailContainer = document.querySelector(".item");

    // item detail container
    let itemContainer = document.createElement("div");

    // item.title 
    let itemTitle = document.createElement("h4");
    itemTitle.textContent= `${item.title}`;
    // item.img
    // item.price
    let itemPrice = document.createElement("span");
    itemPrice.textContent = `${item.price}`;

    // adding features
    itemContainer.appendChild(itemTitle);
    // item.img
    itemContainer.appendChild(itemPrice);

    itemDetailContainer.appendChild(itemContainer);
    // itemContainer whit all features
    
    // item count

    // add to cart
}

const AddToCart = (itemId) => {
    console.log(itemId);
}

// initialization
Database();



// itemButton.addEventListener("click", () => {
//     let itemId = item.id;
//     AddToCart(itemId);
// });