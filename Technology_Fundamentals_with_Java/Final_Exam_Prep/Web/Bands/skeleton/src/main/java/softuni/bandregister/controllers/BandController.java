package softuni.bandregister.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;
import softuni.bandregister.bindingModels.BandBindingModel;
import softuni.bandregister.entities.Band;
import softuni.bandregister.repositories.BandRepository;

import java.util.List;

@Controller
public class BandController {
    private final BandRepository bandRepository;

    @Autowired
    public BandController(BandRepository bandRepository) {
        this.bandRepository = bandRepository;
    }


    @GetMapping("/")
    public String index(Model model) {
        List<Band> bands = this.bandRepository.findAll();
        model.addAttribute("view", "band/index");
        model.addAttribute("bands", bands);
        return "base-layout";
    }

    @GetMapping("/create")
    public String create(Model model) {
        model.addAttribute("view","band/create");
        return "base-layout";
    }

    @PostMapping("/create")
    public String create(Band band) {
        this.bandRepository.saveAndFlush(band);
        return "redirect:/";
    }

    @GetMapping("/edit/{id}")
    public String edit(Model model,
                             @PathVariable(value = "id") Integer id) {
        Band band = this.bandRepository.findById(id).get();
        model.addAttribute("view","band/edit");
        model.addAttribute("band",band);
        return "base-layout";
    }

    @PostMapping("/edit/{id}")
    public String edit(@PathVariable(value = "id") Integer id, BandBindingModel bandBindingModel) {
        Band band = this.bandRepository.findById(id).get();
        band.setGenre(bandBindingModel.getGenre());
        band.setHonorarium(bandBindingModel.getHonorarium());
        band.setMembers(bandBindingModel.getMembers());
        band.setName(bandBindingModel.getName());
        this.bandRepository.saveAndFlush(band);
        return "redirect:/";
    }

    @GetMapping("/delete/{id}")
    public String delete(Model model,
                               @PathVariable(value = "id") Integer id) {
        Band band = this.bandRepository.findById(id).get();
        model.addAttribute("band",band);
        model.addAttribute("view","band/delete");
        return "base-layout";
    }

    @PostMapping("/delete/{id}")
    public String delete(Band band) {
        this.bandRepository.delete(band);
        return "redirect:/";
    }
}
