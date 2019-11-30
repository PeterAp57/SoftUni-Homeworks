import java.util.Arrays;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);


        List<String> data = Arrays.stream(scanner.nextLine().split("#")).collect(Collectors.toList());

        int water = Integer.parseInt(scanner.nextLine());
        double effort = 0.0;

        for (int i = 0; i < data.size(); i++) {
            String[] fire = data.get(i).split(" = ");
            String type = fire[0];
            int value = Integer.parseInt(fire[1]);

            switch (type) {
                case "High":
                    if (value < 81 || value > 125) {
                        data.remove(i);
                        i--;
                    } else {
                        if (water - value < 0) {
                            data.remove(i);
                            i--;
                            break;
                        } else {
                            water -= value;
                            effort += value * 0.25;
                        }
                    }

                    break;
                case "Medium":
                    if (value < 51 || value > 80) {
                        data.remove(i);
                        i--;
                    } else {
                        if (water - value < 0) {
                            data.remove(i);
                            i--;
                            break;
                        } else {
                            water -= value;
                            effort += value * 0.25;
                        }
                    }

                    break;
                case "Low":
                    if (value < 1 || value > 50) {
                        data.remove(i);
                        i--;
                    } else {
                        if (water - value < 0) {
                            data.remove(i);
                            i--;
                            break;
                        } else {
                            water -= value;
                            effort += value * 0.25;
                        }
                    }
                    break;
            }
        }
        int sum = 0;
        System.out.println("Cells:");
        for (int i = 0; i < data.size(); i++) {
            String[] fire = data.get(i).split(" = ");
            int value = Integer.parseInt(fire[1]);
            System.out.printf(" - %s\n", value);
            sum += value;
        }
        System.out.printf("Effort: %.2f\n" +
                "Total Fire: %d\n", effort,sum);


    }
}
