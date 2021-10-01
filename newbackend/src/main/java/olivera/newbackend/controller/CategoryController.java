package olivera.newbackend.controller;

import olivera.newbackend.model.Category;
import olivera.newbackend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @GetMapping("categories")
    public List<Category> getCategories() {
        return categoryService.getCategories();
        //localhost:8080/categories
    }

    @PostMapping("categories")
    public String postCategory(@RequestBody Category category) {
        categoryService.saveCategory(category);
        return "Kategooria edukalt lisatud! " + category.getName();
        //localhost:8080/categories
    }

    // delete päring
    // edit päring
    // view one item päring


    // andmebaas


    // KODUTÖÖ - kategooria osa teha! (CategoryController, Category, CategoryRepository ...jnejne)
}
