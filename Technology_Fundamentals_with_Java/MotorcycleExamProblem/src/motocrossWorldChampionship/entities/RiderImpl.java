package motocrossWorldChampionship.entities;

import motocrossWorldChampionship.common.ExceptionMessages;
import motocrossWorldChampionship.entities.interfaces.Motorcycle;
import motocrossWorldChampionship.entities.interfaces.Rider;

public class RiderImpl implements Rider {

    private String name;
    private Motorcycle motorcycle;
    private int numberOfWins;
    private boolean canParticipate;

    public RiderImpl(String name) {
        setName(name);
        setMotorcycle(null);
        setNumberOfWins(0);
        setCanParticipate();
    }

    private void setName(String name) {
        if (name == null || name.isEmpty() || name.length() < 5) {
            throw new IllegalArgumentException(String.format(ExceptionMessages.INVALID_NAME, name,5));
        }
        this.name = name;
    }

    private void setMotorcycle(Motorcycle motorcycle) {
        this.motorcycle = motorcycle;
    }

    private void setNumberOfWins(int numberOfWins) {
        this.numberOfWins += numberOfWins;
    }

    private void setCanParticipate() {
        if (this.motorcycle == null) {
            this.canParticipate = false;
        } else {
            this.canParticipate = true;
        }
    }

    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public Motorcycle getMotorcycle() {
        return this.motorcycle;
    }

    @Override
    public int getNumberOfWins() {
        return this.numberOfWins;
    }

    @Override
    public void addMotorcycle(Motorcycle motorcycle) {
        setMotorcycle(motorcycle);
    }

    @Override
    public void winRace() {
        setNumberOfWins(1);
    }

    @Override
    public boolean getCanParticipate() {
        return this.motorcycle != null;
    }
}
