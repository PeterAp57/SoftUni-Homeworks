package models.battleFields;

import models.battleFields.interfaces.Battlefield;
import models.cards.interfaces.Card;
import models.players.Beginner;
import models.players.interfaces.Player;

public class BattleFieldImpl implements Battlefield {

    private static final int HEALTH_INCREASE = 40;
    private static final int CARD_DAMAGE_INCREASE = 30;


    public BattleFieldImpl() {

    }


    @Override
    public void fight(Player attackPlayer, Player enemyPlayer) {
        isDead(attackPlayer, enemyPlayer);
        isBeginner(attackPlayer);
        isBeginner(enemyPlayer);
        getBonusHealthFromDeck(attackPlayer);
        getBonusHealthFromDeck(enemyPlayer);
        duel(attackPlayer, enemyPlayer);
    }

    private void isDead(Player attackPlayer, Player enemyPlayer) {
        if (attackPlayer.isDead() || enemyPlayer.isDead()) {
            throw new IllegalArgumentException("Player is dead!");
        }
    }

    private void isBeginner(Player player) {
        if (Beginner.class.getSimpleName().equals(player.getClass().getSimpleName())) {
            player.setHealth(player.getHealth() + HEALTH_INCREASE);
            player.getCardRepository().getCards()
                    .forEach(e -> e.setDamagePoints(e.getDamagePoints() + CARD_DAMAGE_INCREASE));
        }
    }

    private void getBonusHealthFromDeck(Player player) {
        int bonusHealth = player.getCardRepository()
                .getCards().stream().mapToInt(Card::getHealthPoints).sum();
        player.setHealth(player.getHealth() + bonusHealth);
    }

    private void duel(Player attackPlayer, Player enemyPlayer) {
        while (true) {
            int attackPlayerDamagePoints = attackPlayer.getCardRepository()
                    .getCards().stream().mapToInt(Card::getDamagePoints).sum();

            enemyPlayer.takeDamage(attackPlayerDamagePoints);

            if (enemyPlayer.isDead()) {
                return;
            }

            int enemyPlayerDamagePoints = enemyPlayer.getCardRepository()
                    .getCards().stream().mapToInt(Card::getDamagePoints).sum();

            attackPlayer.takeDamage(enemyPlayerDamagePoints);

            if (attackPlayer.isDead()) {
                return;
            }
        }
    }

}
