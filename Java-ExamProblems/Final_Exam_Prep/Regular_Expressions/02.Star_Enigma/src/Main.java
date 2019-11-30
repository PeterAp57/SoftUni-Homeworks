import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int n = Integer.parseInt(scanner.nextLine());

        Map<String, List<String>> result = new LinkedHashMap<>();
        result.put("Attacked planets", new ArrayList<>());
        result.put("Destroyed planets", new ArrayList<>());

        Pattern pattern = Pattern.compile("([^@\\-!:>])*" +
                "(?<planet>@[A-Za-z]+)([^@\\-!:>])*" +
                "(?<population>:\\d+)([^@\\-!:>])*" +
                "(?<typeOfAttack>\\![A|D]\\!)([^@\\-!:>])*" +
                "(?<soldierCount>->\\d+)([^@\\-!:>])*");

        for (int i = 0; i < n; i++) {
            String input = scanner.nextLine();
            int key = 0;
            key = getKey(input, key);
            input = decryptMsg(input, key);

            Matcher matcher = pattern.matcher(input);

            if (matcher.find()) {

                String planet = matcher.group("planet").substring(1);
                int population = Integer.parseInt(matcher.group("population").substring(1));
                String typeOfAttack = matcher.group("typeOfAttack").substring(1, matcher.group("typeOfAttack").length() - 1);
                int soldierCount = Integer.parseInt(matcher.group("soldierCount").substring(2));

                switch (typeOfAttack) {
                    case "A":
                        String mapKey = "Attacked planets";
                        result.get(mapKey).add(planet);
                        break;
                    case "D":
                        mapKey = "Destroyed planets";
                        result.get(mapKey).add(planet);
                        break;
                }
            }
        }
        for (Map.Entry<String,List<String>> planets : result.entrySet()){
            System.out.println(String.format("%s: %d",planets.getKey(),planets.getValue().size()));

            planets.getValue().sort((e1,e2)->e1.compareTo(e2));

            for (int i = 0; i < planets.getValue().size(); i++) {
                System.out.println(String.format("-> %s",planets.getValue().get(i).toString().replaceAll("\\[\\]","")));
            }

        }
    }

    private static int getKey(String input, int key) {
        for (int i = 0; i < input.length(); i++) {
            if (input.toLowerCase().charAt(i) == 's' ||
                    input.toLowerCase().charAt(i) == 't' ||
                    input.toLowerCase().charAt(i) == 'a' ||
                    input.toLowerCase().charAt(i) == 'r') {
                key++;
            }
        }
        return key;
    }

    private static String decryptMsg(String input, int key) {
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < input.length(); i++) {
            result.append((char) (input.charAt(i) - key));
        }
        return result.toString();
    }

}