import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        String input;

        Pattern pattern = Pattern.compile(".*(?<name>%[A-Z]+[a-z]+%).*(?<product><\\w+>).*(?<quantity>\\|\\d+\\|)\\D*(?<price>\\d+\\.?\\d*?\\$).*");
        List<String> result = new ArrayList<>();
        double totleIncome =0.0;
        while (!"end of shift".equals(input = scanner.nextLine())){
            Matcher matcher = pattern.matcher(input);
            if (matcher.find()){
                String name = matcher.group("name").substring(1,matcher.group("name").length()-1);
                String product = matcher.group("product").substring(1,matcher.group("product").length()-1);
                Double price = Integer.parseInt(matcher.group("quantity").substring(1,matcher.group("quantity").length()-1))*Double.parseDouble(matcher.group("price").substring(0,matcher.group("price").length()-1));
                totleIncome += price;
                result.add(String.format("%s: %s - %.2f",name,product,price));
            }
        }
        for (String item: result){
            System.out.println(item);
        }
        System.out.printf("Total income: %.2f",totleIncome);

    }
}

