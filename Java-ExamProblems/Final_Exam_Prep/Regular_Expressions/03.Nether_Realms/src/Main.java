import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        String input = scanner.nextLine();
        String[] demons = input.split("\\s*,\\s*");

        List<String> result = new ArrayList<>();

        for (int i = 0; i < demons.length; i++) {
            String demon = demons[i];
            int hp = getHealth(demon);
            double dmg = getDamage(demon);
            result.add(String.format("%s - %d health, %.2f damage", demon, hp, dmg));
        }
        result.sort((e1, e2) -> e1.compareTo(e2));
        for (String e : result) {
            System.out.println(e);
        }
    }

    private static int getHealth(String demon) {
        int hp = 0;
        Pattern p = Pattern.compile("(?<chars>[^\\d+\\-*\\/.])");
        Matcher matcher = p.matcher(demon);
        while (matcher.find()){
            char[] ch = matcher.group("chars").toCharArray();
            for (int i = 0; i < ch.length ; i++) {
                hp += ch[i];
            }
        }
        return hp;
    }

    private static double getDamage(String demon) {
        double dmg = 0.0;
        Pattern p = Pattern.compile("(?<number>[-+]?\\d+\\.?\\d*)");
        Matcher matcher = p.matcher(demon);
        while (matcher.find()) {
            dmg += Double.parseDouble(matcher.group("number"));
        }
        Pattern p1 = Pattern.compile("(?<special>[*\\/])");
        matcher = p1.matcher(demon);
        while (matcher.find()) {
            if (matcher.group("special").equals("*")) {
                dmg *= 2;
            } else if (matcher.group("special").equals("/")) {
                dmg /= 2;
            }
        }
        return dmg;
    }

}
