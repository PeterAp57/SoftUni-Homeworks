package motocrossWorldChampionship.repositories;

import motocrossWorldChampionship.common.ExceptionMessages;
import motocrossWorldChampionship.entities.interfaces.Race;
import motocrossWorldChampionship.repositories.interfaces.Repository;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

public class RaceRepository implements Repository<Race> {

    private Collection<Race> data;

    public RaceRepository() {
        this.data = new ArrayList<>();
    }

    @Override
    public Race getByName(String name) {
        if (name == null || name.isEmpty() || this.data.stream().noneMatch(e -> e.getName().equals(name))) {
            throw new NullPointerException(String.format(ExceptionMessages.RACE_NOT_FOUND, name));
        }
        return this.data.stream().filter(e -> e.getName().equals(name))
                .limit(1)
                .findFirst()
                .orElse(null);
    }

    @Override
    public Collection<Race> getAll() {
        return Collections.unmodifiableCollection(this.data);
    }

    @Override
    public void add(Race model) {
        if (model == null) {
            throw new NullPointerException(ExceptionMessages.RACE_INVALID);
        }
        if (this.data.stream().anyMatch(e -> e.getName().equals(model.getName()))) {
            throw new IllegalArgumentException(String.format(ExceptionMessages.RACE_EXISTS, model.getName()));
        }
        this.data.add(model);
    }

    @Override
    public boolean remove(Race model) {
        return this.data.removeIf(e -> e.getName().equals(model.getName()));
    }
}
