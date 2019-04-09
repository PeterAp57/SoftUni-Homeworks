import java.util.*;
import java.util.stream.Collectors;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        String input = "";

        Map<String, List<String>> bands = new LinkedHashMap<>();
        Map<String, Integer> bandsTimeOnStage = new LinkedHashMap<>();
        while (!"start of concert".equals(input = scanner.nextLine())) {
                String[] commands = input.split(";\\s+");
                sortContent(bands, bandsTimeOnStage, commands);
        }
        Map<String, Integer> result = bandsTimeOnStage.entrySet().stream()
                .sorted((Map.Entry.<String, Integer>comparingByValue().reversed()))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e2, LinkedHashMap::new));

        int totleTime = 0;
        for (Map.Entry<String, Integer> e : result.entrySet()) {
            totleTime += e.getValue();
        }
        String band = scanner.nextLine().trim();
        System.out.printf("Total time: %d\n", totleTime);
        for (Map.Entry<String, Integer> e : result.entrySet()) {
            System.out.printf("%s -> %d\n", e.getKey(), e.getValue());
        }
        System.out.println(band);

            for (String e : bands.get(band)) {
                System.out.println(String.format("=> %s",e));
            }

    }

    private static void sortContent(Map<String, List<String>> bands, Map<String, Integer> bandsTimeOnStage, String[] commands) {
        switch (commands[0]) {
            case "Add":
                String key = commands[1];
                bands.putIfAbsent(key, new ArrayList<>());
                String names = commands[2];
                List<String> members = Arrays.stream(names.split(",\\s+")).collect(Collectors.toList());
                for (int i = 0; i < members.size(); i++) {
                    if (!bands.get(key).contains(members.get(i))) {
                        bands.get(key).add(members.get(i));
                    }
                }
                break;
            case "Play":
                key = commands[1];
                int time = Integer.parseInt(commands[2]);
                if (!bandsTimeOnStage.containsKey(key)) {
                    bandsTimeOnStage.put(key, time);
                } else {
                    int newTime = bandsTimeOnStage.get(key) + time;
                    bandsTimeOnStage.put(key, newTime);
                }
                break;
        }
    }

}
