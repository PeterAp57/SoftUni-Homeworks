package com.softuni.entity;

public class Calculator {
    private double leftOperand;
    private double rightOperand;
    private String operator;

    public Calculator() {
    }

    public Calculator(double leftOperand, double rightOperand, String operator) {
        this.leftOperand = leftOperand;
        this.rightOperand = rightOperand;
        this.operator = operator;
    }

    public double calculateResult() {
        double result = 0.0;
        switch (this.operator) {
            case "+":
                result = this.getLeftOperand() + this.getRightOperand();
                break;
            case "-":
                result = this.getLeftOperand() - this.getRightOperand();
                break;
            case "*":
                result = this.getLeftOperand() * this.getRightOperand();
                break;
            case "/":
                result = this.getLeftOperand() / this.getRightOperand();
                break;
            case "^":
                result = Math.pow(this.getLeftOperand(), this.getRightOperand());
                break;
            case "%":
                result = (this.getLeftOperand() * 0.01) * this.getRightOperand();
                break;
            case "sqrt":
                if (this.getLeftOperand() == 0) {
                    result = 1 * Math.sqrt(this.getRightOperand());
                } else {
                    result = this.getLeftOperand() * Math.sqrt(this.getRightOperand());
                }
                break;
            default:
                result = 0.0;
                break;
        }

        return result;
    }

    public double getLeftOperand() {
        return leftOperand;
    }

    public void setLeftOperand(double leftOperand) {
        this.leftOperand = leftOperand;
    }

    public double getRightOperand() {
        return rightOperand;
    }

    public void setRightOperand(double rightOperand) {
        this.rightOperand = rightOperand;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }
}
