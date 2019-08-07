package repositories;

import models.players.interfaces.Player;
import repositories.interfaces.PlayerRepository;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class PlayerRepositoryImpl implements PlayerRepository {

    private Map<String, Player> players;

    public PlayerRepositoryImpl() {
        this.players = new LinkedHashMap<>();
    }

    @Override
    public int getCount() {
        return this.players.values().size();
    }

    @Override
    public List<Player> getPlayers() {
        return new ArrayList<>(this.players.values());
    }

    @Override
    public void add(Player player) {
        if (player == null || player.getUsername().isEmpty()) {
            throw new IllegalArgumentException("Player cannot be null");
        }
        if (this.players.containsKey(player.getUsername())) {
            throw new IllegalArgumentException(String.format("Player %s already exists!", player.getUsername()));
        }
        this.players.putIfAbsent(player.getUsername(), player);
    }

    @Override
    public boolean remove(Player player) {
        if (player == null || player.getUsername().isEmpty()) {
            throw new IllegalArgumentException("Player cannot be null");
        }
        return players.remove(player.getUsername(), player);
    }

    @Override
    public Player find(String name) {
        return this.players.get(name);
    }
}
