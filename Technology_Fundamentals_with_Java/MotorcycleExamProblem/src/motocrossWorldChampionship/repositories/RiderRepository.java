package motocrossWorldChampionship.repositories;

import motocrossWorldChampionship.common.ExceptionMessages;
import motocrossWorldChampionship.entities.interfaces.Rider;
import motocrossWorldChampionship.repositories.interfaces.Repository;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

public class RiderRepository implements Repository<Rider> {

    private Collection<Rider> data;

    public RiderRepository() {
        this.data = new ArrayList<>();
    }

    @Override
    public Rider getByName(String name) {
        if (this.data.stream().noneMatch((e -> e.getName().equals(name)))|| name.isEmpty()) {
            throw new NullPointerException(String.format(ExceptionMessages.RIDER_NOT_FOUND, name));
        }
        return this.data.stream().filter(e -> e.getName().equals(name))
                .limit(1)
                .findFirst()
                .orElse(null);
    }

    @Override
    public Collection<Rider> getAll() {
        return Collections.unmodifiableCollection(this.data);
    }

    @Override
    public void add(Rider model) {
        if (this.data.stream().anyMatch((e -> e.getName().equals(model.getName())))) {
            throw new IllegalArgumentException(String.format(ExceptionMessages.RIDER_EXISTS, model.getName()));
        }
        this.data.add(model);
    }

    @Override
    public boolean remove(Rider model) {
        return this.data.removeIf(e -> e.getName().equals(model.getName()));
    }
}
