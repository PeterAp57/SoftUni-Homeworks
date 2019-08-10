package motocrossWorldChampionship.core;

import motocrossWorldChampionship.common.ExceptionMessages;
import motocrossWorldChampionship.common.OutputMessages;
import motocrossWorldChampionship.core.interfaces.ChampionshipController;
import motocrossWorldChampionship.entities.PowerMotorcycle;
import motocrossWorldChampionship.entities.RaceImpl;
import motocrossWorldChampionship.entities.RiderImpl;
import motocrossWorldChampionship.entities.SpeedMotorcycle;
import motocrossWorldChampionship.entities.interfaces.Motorcycle;
import motocrossWorldChampionship.entities.interfaces.Race;
import motocrossWorldChampionship.entities.interfaces.Rider;
import motocrossWorldChampionship.repositories.interfaces.Repository;

import java.util.*;
import java.util.stream.Collectors;

public class ChampionshipControllerImpl implements ChampionshipController {

    private Repository<Rider> riderRepository;
    private Repository<Motorcycle> motorcycleRepository;
    private Repository<Race> raceRepository;

    public ChampionshipControllerImpl(Repository<Rider> riderRepository, Repository<Motorcycle> motorcycleRepository, Repository<Race> raceRepository) {
        this.riderRepository = riderRepository;
        this.motorcycleRepository = motorcycleRepository;
        this.raceRepository = raceRepository;
    }

    @Override
    public String createRider(String riderName) {
        this.riderRepository.add(new RiderImpl(riderName));
        return String.format(OutputMessages.RIDER_CREATED, riderName);
    }

    @Override
    public String createMotorcycle(String type, String model, int horsePower) {
        String message = "";
        switch (type) {
            case "Speed":
                this.motorcycleRepository.add(new SpeedMotorcycle(model, horsePower));
                message = String.format(OutputMessages.MOTORCYCLE_CREATED, "SpeedMotorcycle", model);
                break;
            case "Power":
                this.motorcycleRepository.add(new PowerMotorcycle(model, horsePower));
                message = String.format(OutputMessages.MOTORCYCLE_CREATED, "PowerMotorcycle", model);
                break;
        }
        return message;
    }

    @Override
    public String addMotorcycleToRider(String riderName, String motorcycleModel) {
        Rider rider = this.riderRepository.getByName(riderName);
        Motorcycle motorcycle = this.motorcycleRepository.getByName(motorcycleModel);

        rider.addMotorcycle(motorcycle);

        return String.format(OutputMessages.MOTORCYCLE_ADDED, riderName, motorcycleModel);
    }

    @Override
    public String addRiderToRace(String raceName, String riderName) {
        Race race = this.raceRepository.getByName(raceName);
        Rider rider = this.riderRepository.getByName(riderName);

        race.addRider(rider);

        return String.format(OutputMessages.RIDER_ADDED, riderName, raceName);
    }

    @Override
    public String startRace(String raceName) {
        Race race = this.raceRepository.getByName(raceName);
        if (race.getRiders().size() < 3) {
            throw new IllegalArgumentException(String.format(ExceptionMessages.RACE_INVALID, raceName, 3));
        }
        int laps = race.getLaps();

        List<Rider> riders = race.getRiders().stream()
                .sorted((e, e1) -> Double.compare(e1.getMotorcycle().calculateRacePoints(laps), e.getMotorcycle().calculateRacePoints(laps)))
                .collect(Collectors.toList());

        this.raceRepository.remove(race);

        return String.format(OutputMessages.RIDER_FIRST_POSITION, riders.get(0).getName(), riders.get(0).getMotorcycle().calculateRacePoints(laps)) +
                System.lineSeparator() +
                String.format(OutputMessages.RIDER_SECOND_POSITION, riders.get(1).getName(), riders.get(1).getMotorcycle().calculateRacePoints(laps)) +
                System.lineSeparator() +
                String.format(OutputMessages.RIDER_THIRD_POSITION, riders.get(2).getName(), riders.get(2).getMotorcycle().calculateRacePoints(laps)) +
                System.lineSeparator().trim();

    }

    @Override
    public String createRace(String name, int laps) {
        this.raceRepository.add(new RaceImpl(name, laps));

        return String.format(OutputMessages.RACE_CREATED, name);
    }
}
