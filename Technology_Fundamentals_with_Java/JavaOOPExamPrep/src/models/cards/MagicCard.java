package models.cards;

public class MagicCard extends BaseCard {

    private static final Integer DEFAULT_DAMAGE_POINTS = 5;
    private static final Integer DEFAULT_HEALTH_POINTS = 80;


    public MagicCard(String name) {
        super(name, DEFAULT_DAMAGE_POINTS, DEFAULT_HEALTH_POINTS);
    }
}
