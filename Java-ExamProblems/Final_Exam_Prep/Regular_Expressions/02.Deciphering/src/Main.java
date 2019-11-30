import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        String input = scanner.nextLine();
        String subString = scanner.nextLine();

        String[] subStrings = subString.split(" ");
        String sub1 = subStrings[0];
        String sub2 = subStrings[1];

        Pattern pattern = Pattern.compile("^[d-z{}|#]+$");
        Matcher matcher = pattern.matcher(input);

        if (matcher.find()) {
            String result = "";
            result = deciphering(input, sub1, sub2, result);

            System.out.println(result);
        } else {
            System.out.println("This is not the book you are looking for.");
        }

    }

    private static String deciphering(String input, String sub1, String sub2, String result) {
        for (int i = 0; i < input.length(); i++) {
            result += (char) (input.charAt(i) - 3);
        }
        result = result.replace(sub1, sub2);
        return result;
    }

}
