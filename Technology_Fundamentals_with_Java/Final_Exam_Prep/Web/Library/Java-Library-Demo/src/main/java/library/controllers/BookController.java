package library.controllers;

import library.bindingModels.BookBindingModel;
import library.entities.Book;
import library.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
public class BookController {
    private final BookRepository bookRepository;

    @Autowired
    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }


    @GetMapping("/")
    public String index(Model model) {
        List<Book> books = this.bookRepository.findAll();
        model.addAttribute("view", "book/Index");
        model.addAttribute("books", books);
        return "base-layout";
    }

    @GetMapping("/create")
    public String create(Model model) {
        model.addAttribute("view", "book/Create");
        return "base-layout";
    }

    @PostMapping("/create")
    public String create(Book book) {
        this.bookRepository.saveAndFlush(book);
        return "redirect:/";
    }

    @GetMapping("/edit/{id}")
    public String edit(@PathVariable(value = "id") Integer id, Model model) {
        model.addAttribute("view", "book/Edit");
        Book book = this.bookRepository.findById(id).get();
        model.addAttribute("book", book);
        return "base-layout";
    }

    @PostMapping("edit/{id}")
    public String edit(@PathVariable(value = "id") Integer id, BookBindingModel bookBindingModel) {
        Book book = this.bookRepository.findById(id).get();
        book.setAuthor(bookBindingModel.getAuthor());
        book.setTitle(bookBindingModel.getTitle());
        book.setPrice(bookBindingModel.getPrice());
        this.bookRepository.saveAndFlush(book);
        return "redirect:/";
    }

    @GetMapping("/delete/{id}")
    public String remove(@PathVariable(value = "id") Integer id, Model model) {
        Book book = this.bookRepository.findById(id).get();
        model.addAttribute("view", "book/Remove");
        model.addAttribute("book",book);
        return "base-layout";
    }

    @PostMapping("/delete/{id}")
    public String remove(Book book) {
        this.bookRepository.delete(book);
        return "redirect:/";
    }
}
