package models.cards;

public class TrapCard extends BaseCard {

    private static final Integer DEFAULT_DAMAGE_POINTS = 120;
    private static final Integer DEFAULT_HEALTH_POINTS = 5;

    public TrapCard(String name) {
        super(name, DEFAULT_DAMAGE_POINTS, DEFAULT_HEALTH_POINTS);
    }
}
