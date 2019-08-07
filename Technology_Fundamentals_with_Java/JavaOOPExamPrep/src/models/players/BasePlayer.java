package models.players;

import common.ConstantMessages;
import models.cards.interfaces.Card;
import models.players.interfaces.Player;
import repositories.interfaces.CardRepository;

public abstract class BasePlayer implements Player {

    private String name;
    private int health;
    private CardRepository cardRepository;
    private boolean isDead;

    protected BasePlayer(CardRepository cardRepository, String name, int health) {
        setName(name);
        setHealth(health);
        this.cardRepository = cardRepository;
        setDead();
    }

    private void setName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Player's username cannot be null or an empty string.");
        }
        this.name = name;
    }

    @Override
    public CardRepository getCardRepository() {
        return this.cardRepository;
    }

    @Override
    public String getUsername() {
        return this.name;
    }

    @Override
    public int getHealth() {
        return this.health;
    }

    @Override
    public void setHealth(int healthPoints) {
        if (healthPoints < 0) {
            throw new IllegalArgumentException("Player's health bonus cannot be less than zero.");
        }
        this.health = healthPoints;
    }

    @Override
    public boolean isDead() {
        if (this.health <= 0) {
            this.isDead = true;
        }
        return this.isDead;
    }

    private void setDead() {
        this.isDead = this.getHealth() <= 0;
    }

    @Override
    public void takeDamage(int damagePoints) {
        if (damagePoints < 0) {
            throw new IllegalArgumentException("Damage points cannot be less than zero.");
        }
        this.health -= damagePoints;
        if (getHealth() <= 0) {
            isDead();
            this.health = 0;
        }
    }

    @Override
    public String toString() {
        int cardCount = this.cardRepository.getCount();
        StringBuilder builder = new StringBuilder();
        builder.append(String.format(ConstantMessages.PLAYER_REPORT_INFO,
                this.getUsername(),
                this.getHealth(),
                cardCount))
                .append(System.lineSeparator());

        for (Card c : this.getCardRepository().getCards()) {
            builder.append(c.toString()).append(System.lineSeparator());
        }

        builder.append(ConstantMessages.DEFAULT_REPORT_SEPARATOR);

        return builder.toString().trim();
    }
}
