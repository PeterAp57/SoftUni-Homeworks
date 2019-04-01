package com.softuni.controller;

import com.softuni.entity.Calculator;
import org.springframework.boot.devtools.env.DevToolsPropertyDefaultsPostProcessor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class HomeController {

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("operator", "+");
        model.addAttribute("view", "views/calculatorForm");
        return "base-layout";
    }

    @PostMapping("/")
    public String calculate(@RequestParam String leftOperand,
                            @RequestParam String operator,
                            @RequestParam String rightOperand,
                            Model modle) {
        double lO;
        double rO;

        try {
            lO = Double.parseDouble(leftOperand);
        } catch (NumberFormatException ex) {
            lO = 0;
        }

        try {
            rO = Double.parseDouble(rightOperand);
        } catch (NumberFormatException ex) {
            rO = 0;
        }

        Calculator calculator = new Calculator(lO, rO, operator);
        double result = calculator.calculateResult();

        modle.addAttribute("leftOperand", calculator.getLeftOperand());
        modle.addAttribute("operator", calculator.getOperator());
        modle.addAttribute("rightOperand", calculator.getRightOperand());
        modle.addAttribute("result", result);

        modle.addAttribute("view", "views/calculatorForm");
        return "base-layout";
    }


}
