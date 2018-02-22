document.addEventListener("DOMContentLoaded", function (event) {

    // just to test, later will be removed when JSON connection is working
    let categoriesArray = ["Shirts", "Pants", "Jackets", "Dresses"];

    let budgetPageElement = document.querySelector("#budget");
    let budgetContainer = document.createElement("div");
    budgetContainer.className = "budget-container";

    let array = [{
        name : 'Summer is here',
        type : 'shorts',
        budget: '15,00',
        category : 'Pants'
    }, {
        name : 'Crop tops ugh',
        type : 'top',
        budget: '10,00',
        category : 'Shirts'
    }, {
        name : 'Mr. back pockets',
        type : 'jeans',
        budget: '7,00',
        category : 'Pants'
    },
        {
            name : 'Miss wet t-shirt',
            type : 't-shirt',
            budget: '5,00',
            category : 'Shirts'
        }, {
            name : 'Fashionable fluffy jacket',
            type : 'winter',
            budget: '20,00',
            category : 'Jackets'
        },{
            name : 'Cool suit jacket',
            type : 'suit',
            budget: '56,00',
            category : 'Jackets'
        }];

    budgetPageElement.appendChild(budgetContainer);

    getData(); // temporary function, until JSON connection works.

    /* Temporary function to fill in some information, just to check things work fine. */
    function getData() {
        getCategories();
        getItems();


        let budgetGroups = document.querySelectorAll(".budget-group");
        for (let budgetGroup of budgetGroups) {
            updateTotalBudget(budgetGroup);
        }

    }

    function getCategories() {
        for (let category of categoriesArray) {
            let newBudgetGroup = createBudgetGroup(category);
            newBudgetGroup.classList.add("category-" + category.toLowerCase());
            budgetContainer.appendChild(newBudgetGroup);
        }
    }

    function getItems () {
        for (let product of array) {
            let category = document.querySelector(".category-"
                + product.category.toLowerCase());
            let itemsContainer = category.querySelector(".budget-items-container");

            let newProduct = createBudgetItemRow();

            let productName = newProduct.querySelector("[name='name']");
            productName.value = product.name;
            let productBudget = newProduct.querySelector("[name='budget']");
            productBudget.value = parseFloat(product.budget);
            let productType = newProduct.querySelector("[name='type']");
            productType.value = product.type;

            itemsContainer.appendChild(newProduct);

        }
    }


    function createBudgetGroup(name) {
        let budgetGroup = document.createElement("div");
        budgetGroup.className = "budget-group";

        let itemsContainer = document.createElement("div");
        itemsContainer.className = "budget-items-container";

        budgetGroup.appendChild(createHeader(name));
        budgetGroup.appendChild(itemsContainer);
        budgetGroup.appendChild(createBudgetGroupFooter());

        return budgetGroup;
    }

    function createBudgetGroupFooter() {
        let footerRow = document.createElement("div");
        footerRow.className = "budget-group__footer budget-item-row";

        let addButton = document.createElement("button");
        addButton.className = "budget-group__add-button";
        addButton.innerHTML = "<img src='img/add.png' alt='Application logo'> Add new item";
        addButton.addEventListener('click', function(event) {
            let target = event.target;
            let budgetGroup = target.parentNode.parentNode;
            let itemsContainer = budgetGroup.querySelector(".budget-items-container");
            let newItem = createBudgetItemRow();
            itemsContainer.appendChild(newItem);
        });

        let textDiv = document.createElement("div");
        textDiv.className = "budget-group__total-text";
        textDiv.textContent = "Total:";

        let budgetGroupTotal = document.createElement("div");
        budgetGroupTotal.className = "budget-group__total-budget";
        footerRow.appendChild(addButton);
        footerRow.appendChild(textDiv);
        footerRow.appendChild(budgetGroupTotal);

        return footerRow;
    }

    function createHeader(name) {
        let budgetGroupHeader = document.createElement("div");
        budgetGroupHeader.className = "budget-group-header";


        let budgetHeaderColumn = document.createElement("div");
        let productTypeHeaderColumn = document.createElement("div");

        let budgetGroupName = document.createElement("div");
        let budgetGroupNameContainer = document.createElement("div");
        budgetGroupNameContainer.className = "budget-group-header__column";


        budgetHeaderColumn.textContent = "Budget";
        budgetHeaderColumn.className = "budget-group-header__column";

        productTypeHeaderColumn.textContent = "Type";
        productTypeHeaderColumn.className = "budget-group-header__column";

        budgetGroupName.textContent = name;
        budgetGroupName.className = "budget-group-header__tab";

        budgetGroupNameContainer.appendChild(budgetGroupName);
        budgetGroupHeader.appendChild(budgetGroupNameContainer);
        budgetGroupHeader.appendChild(productTypeHeaderColumn);
        budgetGroupHeader.appendChild(budgetHeaderColumn);

        return budgetGroupHeader;
    }

    function createBudgetItemRow() {
        let budgetItemRow = document.createElement("div");
        budgetItemRow.className ="budget-item-row";


        let name = document.createElement("input");
        name.name = "name";
        name.setAttribute("type", "text");
        name.className = "budget-item__name";

        let nameDiv = document.createElement("div");
        nameDiv.className = "budget-item-row__column";
        nameDiv.appendChild(name);


        let budget = document.createElement("input");
        budget.name = "budget";
        budget.setAttribute("type", "number");
        budget.className = "budget-item__budget";

        let budgetDiv = document.createElement("div");
        budgetDiv.className = "budget-item-row__column";
        budgetDiv.appendChild(budget);


        let type = document.createElement("input");
        type.name = "type";
        type.setAttribute("type", "text");
        type.className = "budget-item__type";

        let typeDiv = document.createElement("div");
        typeDiv.className = "budget-item-row__column";
        typeDiv.appendChild(type);

        budgetItemRow.appendChild(nameDiv);
        budgetItemRow.appendChild(typeDiv);
        budgetItemRow.appendChild(budgetDiv);


        return budgetItemRow;

    }

    //add EventListener to all budget cells
    //take into account that the budget group needs to update the budget also when a row is deleted!
    function updateTotalBudget(budgetGroup) {
        let totalBudget = 0;
        let itemBudgets = budgetGroup.querySelectorAll(".budget-item__budget");

        // loop that goes through all the items in the item group
        // and adds the amounts to totalBudget
        for (let itemBudget of itemBudgets) {
            totalBudget += parseFloat(itemBudget.value);
        }

        let totalBudgetCell = budgetGroup.querySelector(".budget-group__total-budget");
        totalBudgetCell.textContent = totalBudget.toString();

    }

});