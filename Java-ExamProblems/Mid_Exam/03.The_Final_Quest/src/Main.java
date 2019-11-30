import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        String input = scanner.nextLine();
        List<String> collection = Arrays.stream(input.split("\\s+")).collect(Collectors.toList());

        while (!"Stop".equals(input = scanner.nextLine())) {
            String[] command = input.split("\\s+");
            int index;
            String word1;
            String word2;
            switch (command[0]) {
                case "Delete":
                    index = Integer.parseInt(command[1]) + 1;
                    if (index < collection.size()&& index >=0) {
                        collection.remove(index);
                    }
                    break;
                case "Swap":
                    word1 = command[1];
                    word2 = command[2];
                    if (collection.contains(word1) && collection.contains(word2)) {
                        int indexWord1 = collection.indexOf(word1);
                        int indexWord2 = collection.indexOf(word2);
                        collection.set(indexWord1,word2);
                        collection.set(indexWord2,word1);
                    }
                    break;
                case "Put":
                    word1 = command[1];
                    index = Integer.parseInt(command[2]) - 1;
                    if (index < 0){
                        break;
                    }
                    if (index <= collection.size() && index >=0) {
                        collection.add(index, word1);
                    }
                    break;
                case "Sort":
                    Collections.sort(collection,Collections.reverseOrder());
                    break;
                case "Replace":
                    word1 = command[1];
                    word2 = command[2];
                    if (collection.contains(word2)) {
                        int indexWord2 = collection.indexOf(word2);
                        collection.set(indexWord2, word1);
                    }
                    break;
            }
        }
        System.out.println(collection.toString().replaceAll("[\\[,\\]]", ""));

    }
}
