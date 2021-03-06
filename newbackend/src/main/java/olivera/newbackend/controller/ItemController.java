package olivera.newbackend.controller;

import olivera.newbackend.model.Item;
import olivera.newbackend.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ItemController {

    @Autowired
    ItemService itemService;

    @GetMapping("items")
    public List<Item> getItems() {
        return itemService.getItems();
        //localhost:8080/items
    }

    @PostMapping("items")
    public String postItem(@RequestBody Item item) {
        itemService.saveItem(item);
        return "Ese edukalt lisatud! " + item.getName();
        //localhost:8080/items
    }

    // delete päring
    // edit päring
    // view one item päring


    // andmebaas


    // KODUTÖÖ - kategooria osa teha! (CategoryController, Category, CategoryRepository ...jnejne)
}
