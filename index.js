const readline = require('readline');

// Create interface for reading user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Inventory class
class Inventory {
    constructor() {
        this.items = {};
    }

    addItem(item) {
        if (this.items[item.name]) {
            console.log("Item already exists in inventory. Updating quantity.");
            this.items[item.name].quantity += item.quantity;
        } else {
            this.items[item.name] = item;
        }
    }

    removeItem(itemName) {
        if (this.items[itemName]) {
            delete this.items[itemName];
            console.log(`${itemName} removed from inventory.`);
        } else {
            console.log(`${itemName} not found in inventory.`);
        }
    }

    displayInventory() {
        console.log("Current Inventory:");
        for (let itemName in this.items) {
            console.log(`Item: ${this.items[itemName].name}`);
            console.log(`Price: ${this.items[itemName].price}`);
            console.log(`Quantity: ${this.items[itemName].quantity}`);
            console.log("----------------------");
        }
    }
}

// Inventory item class
class InventoryItem {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

// Create a new inventory
const inventory = new Inventory();

// Main function to handle user input
function main() {
    rl.question("\nOptions:\n1. Add item\n2. Remove item\n3. Display inventory\n4. Exit\nEnter your choice: ", (choice) => {
        switch (choice) {
            case "1":
                rl.question("Enter item name: ", (name) => {
                    rl.question("Enter item price: ", (price) => {
                        rl.question("Enter item quantity: ", (quantity) => {
                            const item = new InventoryItem(name, parseFloat(price), parseInt(quantity));
                            inventory.addItem(item);
                            main();
                        });
                    });
                });
                break;
            case "2":
                rl.question("Enter item name to remove: ", (name) => {
                    inventory.removeItem(name);
                    main();
                });
                break;
            case "3":
                inventory.displayInventory();
                main();
                break;
            case "4":
                console.log("Exiting program.");
                rl.close();
                break;
            default:
                console.log("Invalid choice. Please enter a valid option.");
                main();
                break;
        }
    });
}

main();