import java.util.*;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        String input = scanner.nextLine();
        String[] words = input.split("[\\|]");
        Map<String, List<String>> dictionary = new TreeMap<>();
        getDictionary(words, dictionary);
        input = scanner.nextLine();
        String[] command = input.split("[\\|]");
        SortAndPrint(dictionary, command);
        input = scanner.nextLine();
        if (input.equals("List")){
            for(Map.Entry<String, List<String>> e : dictionary.entrySet()){
                System.out.printf("%s ",e.getKey());
            }
        }
    }

    private static void SortAndPrint(Map<String, List<String>> dictionary, String[] command) {
        for (int i = 0; i < command.length; i++) {
            String word = command[i].trim();
            if (dictionary.containsKey(word)) {
                Collections.sort(dictionary.get(word), Comparator.comparing(String::length).reversed());
                System.out.println(word);
                for (String e : dictionary.get(word)) {
                    System.out.printf(" -%s\n",e);
                }
            }
        }
    }

    private static void getDictionary(String[] words, Map<String, List<String>> dictionary) {
        for (int i = 0; i < words.length; i++) {
            String[] wordDefinition = words[i].trim().split(": ");
            dictionary.putIfAbsent(wordDefinition[0], new ArrayList<>());
            dictionary.get(wordDefinition[0]).add(wordDefinition[1]);
        }
    }

}
