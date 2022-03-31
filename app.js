let cart = [];
const cartLocalStorage = window.localStorage;

const Database = () => {
    const items = [
        {
            id: 1,
            title: 'Peugeot 308',
            price: 1800000, 
            detail: "Peugeot 308 blanco gasolero",
            image: "images/marshallEarbuds.png",
        },
        {
            id: 2,
            title: 'Peugeot 208',
            price: 2200000,
            detail: "Peugeot 208 azul naftero", 
            image: "images/marshallEarbuds.png",
        },
        {
            id: 3,
            title: 'Peugeot 307',
            price: 1000000, 
            detail: "Peugeot 307 gris naftero",
            image: "images/marshallEarbuds.png",
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

        // adding item title
        let itemTitle = document.createElement("h4");
        itemTitle.textContent= `${item.title}`;
        
        // adding item img
        let itemImage = document.createElement("img");
        itemImage.src = `${item.image}`;

        // adding item price
        let itemPrice = document.createElement("span");
        itemPrice.textContent = `${item.price}`;

        // adding item btn
        let detailsButton = document.createElement("button");
        detailsButton.textContent = "View details";
        detailsButton.className = "btn btn-primary";
        detailsButton.addEventListener("click", () => { 
            ActivateModal(item);
        })

        // adding add to cart btn
        let toCartButton = document.createElement("button");
        toCartButton.textContent = "Add to cart";
        toCartButton.className = "btn btn-secondary";
        toCartButton.addEventListener("click", () => {
            AddToCart(item);
        })
        
        // adding features
        itemContainer.appendChild(itemTitle);
        itemContainer.appendChild(itemImage);
        itemContainer.appendChild(itemPrice);
        itemContainer.appendChild(detailsButton);
        itemContainer.appendChild(toCartButton);

        // itemContainer whit all features
        itemsContainer.appendChild(itemContainer);
    })
}

const ActivateModal = (item) => {
    let modalWrap = null;
    const showModal = () => {
        if (modalWrap !== null) {
            modalWrap.remove();
        }
        modalWrap = document.createElement("div");

        let modalBox = document.createElement("div");
        modalBox.className = "modal modal-content";
        let modalDialog = document.createElement("div");
        modalDialog.className = "modal-dialog";
        let modalContent = document.createElement("div");
        modalContent.className = "modal-content";

        let itemTitle = document.createElement("h4");
        itemTitle.textContent= `${item.title}`;
        let itemPrice = document.createElement("span");
        itemPrice.textContent = `${item.price}`;
        let itemDetail = document.createElement("p");
        itemDetail.textContent = `${item.detail}`;

        // adding features
        modalBox.appendChild(modalDialog);
        modalContent.appendChild(itemTitle);
        modalContent.appendChild(itemPrice);
        modalContent.appendChild(itemDetail);
        modalDialog.appendChild(modalContent);
        modalWrap.appendChild(modalBox);
        document.body.append(modalWrap);
        
        let modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
        modal.show();
    } 
    showModal();
}

const AddToCart = (item) => {
    cart.push(item) && cartLocalStorage.setItem('cart', JSON.stringify(cart));
}

const LoadStoredCart = () => {
    cartLocalStorage.getItem('cart') !== null ? cart = JSON.parse(cartLocalStorage.getItem('cart')) : console.log('cart no exist');
}

// initialization
LoadStoredCart();
Database();