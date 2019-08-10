package motocrossWorldChampionship.repositories;

import motocrossWorldChampionship.common.ExceptionMessages;
import motocrossWorldChampionship.entities.interfaces.Motorcycle;
import motocrossWorldChampionship.repositories.interfaces.Repository;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

public class MotorcycleRepository implements Repository<Motorcycle> {

    private Collection<Motorcycle> data;

    public MotorcycleRepository() {
        this.data = new ArrayList<>();
    }


    @Override
    public Motorcycle getByName(String name) {
        if (name == null || name.isEmpty() || this.data.stream().noneMatch(e -> e.getModel().equals(name))) {
            throw new NullPointerException(String.format(ExceptionMessages.MOTORCYCLE_NOT_FOUND, name));
        }
        return this.data.stream().filter(e -> e.getModel().equals(name))
                .limit(1)
                .findFirst()
                .orElse(null);
    }

    @Override
    public Collection<Motorcycle> getAll() {
        return Collections.unmodifiableCollection(this.data);
    }

    @Override
    public void add(Motorcycle model) {
        if (model == null) {
            throw new NullPointerException(ExceptionMessages.MOTORCYCLE_INVALID);
        }
        if (this.data.stream().anyMatch(e -> e.getModel().equals(model.getModel()))) {
            throw new IllegalArgumentException(String.format(ExceptionMessages.MOTORCYCLE_EXISTS, model.getModel()));
        }
        this.data.add(model);
    }

    @Override
    public boolean remove(Motorcycle model) {
        return this.data.removeIf(e -> e.getModel().equals(model.getModel()));
    }
}
