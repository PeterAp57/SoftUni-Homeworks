import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        String input = "";
        Pattern pattern = Pattern.compile("^(?<artist>[A-Z]{1}[a-z'\\s]+):\\s*(?<name>[A-Z\\s]+)$");
        while (!"end".contains(input = scanner.nextLine())) {
            Matcher matcher = pattern.matcher(input);
            if (matcher.find()) {
                int key = matcher.group("artist").length();
                String name = input;
                String result = "";
                for (int i = 0; i < name.length(); i++) {
                    if (name.charAt(i) >= 65 && name.charAt(i) <= 90) {
                        if (name.charAt(i) + key > 90) {
                            int value = name.charAt(i) + key - 90 + 64;
                            result += (char) (value);
                        } else {
                            result += (char) (name.charAt(i) + key);
                        }
                    } else if (name.charAt(i) >= 97 && name.charAt(i) <= 122) {
                        if (name.charAt(i) + key > 122) {
                            int value = name.charAt(i) + key - 122 + 96;
                            result += (char) (value);
                        } else {
                            result += (char) (name.charAt(i) + key);
                        }
                    } else if (name.charAt(i) == 58) {
                        result += "@";
                    } else if (name.charAt(i) == 32) {
                        result += " ";
                    }else {
                        result += name.charAt(i);
                    }
                }
                System.out.printf("Successful encryption: %s\n", result);
            } else {
                System.out.println("Invalid input!");
            }
        }

    }
}
