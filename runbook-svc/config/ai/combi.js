//A vehicle is has a type which can be one of the following: car, truck, or a sports car.
const vehicle = Combi("vehicle");
const vehicleType = vehicle.field("type").isOneOf("car", "truck", "sports car");

// it also has one of the following number of seats: 2,4, or 6.
const vehicleSeats = vehicle.field("seats").isOneOf(2, 4, 6);

// it may either be under warranty or not.
const vehicleWarranty = vehicle.yesNoField("under warranty");

// a sports car has only 2 seats.
vehicleType.whenSetTo("sportsCar").field(vehicleSeats).mustBe(2);

// a truck cannot have 6 seats.
vehicleType.whenSetTo("truck").field(vehicleSeats).cannotBe(6);