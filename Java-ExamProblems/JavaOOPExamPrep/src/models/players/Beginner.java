package models.players;

import repositories.interfaces.CardRepository;

public class Beginner extends BasePlayer  {

    private static final int DEFAULT_HEALTH_POINTS = 50;

    public Beginner(CardRepository cardRepository, String name) {
        super(cardRepository, name, DEFAULT_HEALTH_POINTS);
    }

}
