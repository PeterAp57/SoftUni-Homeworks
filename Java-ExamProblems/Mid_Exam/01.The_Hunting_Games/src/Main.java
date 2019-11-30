import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        int days = Integer.parseInt(scanner.nextLine());
        int players = Integer.parseInt(scanner.nextLine());
        double groupNrg = Double.parseDouble(scanner.nextLine());
        double waterPP = Double.parseDouble(scanner.nextLine());
        double foodPP = Double.parseDouble(scanner.nextLine());

        double neededWater = days * players * waterPP;
        double neededFood = days * players * foodPP;

        for (int i = 1; i <= days; i++) {
            double lostNrg = Double.parseDouble(scanner.nextLine());
            groupNrg -= lostNrg;
            if (groupNrg <= 0 ){
                break;
            }
            if (i%2==0){
                double nrgBoost = groupNrg*0.05;
                groupNrg += nrgBoost;
                neededWater-=neededWater*0.3;
            }
            if (i%3==0){
                neededFood -= neededFood/players;
                groupNrg += groupNrg*0.1;
            }
        }
        if(groupNrg <=0){
            System.out.printf("You will run out of energy. You will be left with %.2f food and %.2f water.\n",neededFood,neededWater);
        }else {
            System.out.printf("You are ready for the quest. You will be left with - %.2f energy!\n",groupNrg);
        }

    }
}