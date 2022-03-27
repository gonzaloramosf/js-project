const Database = () => {
    const items = [
        {
            id: 1,
            title: 'Peugeot 308',
            price: 1800000, 
            detail: "Peugeot 308 blanco gasolero",
        },
        {
            id: 2,
            title: 'Peugeot 208',
            price: 2200000,
            detail: "Peugeot 208 azul naftero", 
        },
        {
            id: 3,
            title: 'Peugeot 307',
            price: 1000000, 
            detail: "Peugeot 307 gris naftero",
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

        // adding item price
        let itemPrice = document.createElement("span");
        itemPrice.textContent = `${item.price}`;

        // adding item btn
        let itemButton = document.createElement("button");
        itemButton.textContent = "View details";
        itemButton.className = "btn btn-primary";
        itemButton.addEventListener("click", () => { 
            ActivateModal(item)
        })
        
        // adding features
        itemContainer.appendChild(itemTitle);
        // item.img
        itemContainer.appendChild(itemPrice);
        itemContainer.appendChild(itemButton);

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

        modalContent

        let itemTitle = document.createElement("h4");
        itemTitle.textContent= `${item.title}`;
        let itemPrice = document.createElement("span");
        itemPrice.textContent = `${item.price}`;
        let itemDetail = document.createElement("p");
        itemDetail.textContent = `${item.detail}`

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

const AddToCart = (itemId) => {
    console.log(itemId);
}
// initialization
Database();