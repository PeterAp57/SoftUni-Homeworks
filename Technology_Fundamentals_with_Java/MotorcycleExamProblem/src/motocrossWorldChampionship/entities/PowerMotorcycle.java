package motocrossWorldChampionship.entities;


public class PowerMotorcycle extends MotorcycleImpl {

    private static final double DEFAULT_CUBIC_CENTIMETERS = 450;
    private static final double MIN_HORSE_POWER = 70;
    private static final double MAX_HORSE_POWER = 100;

    public PowerMotorcycle(String model, int horsePower) {
        super(model, horsePower, DEFAULT_CUBIC_CENTIMETERS);
    }

    @Override
    protected boolean inHorsePowerRange(int horsePower) {
        if (horsePower < MIN_HORSE_POWER || horsePower > MAX_HORSE_POWER) {
            return true;
        }
        return false;
    }


}
