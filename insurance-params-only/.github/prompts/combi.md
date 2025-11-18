# Copilot Instructions for Combi Library

## Goal
Help developers use the **Combi library** to define specification parameters and their interactions—both with each other
and with the expected system behavior.
Typical use cases include describing the traits and variations of entities such as users, insurance policies,
or inventory items. Guide the user in creating fields, applying constraints, and responding to Combi events within
model-based specifications.

## Key Concepts

### Combi Object
This object is used to define and evaluate combinations of parameter values.

#### methods:
- `Combi(name)`: Creates a Combi object with a given name. 
- `combi.name`: The name of the Combi object (read-only).
- `combi.doStart()`: Starts evaluation of the Combi fields.
- `combi.doStop()`: Stops the evaluation of the Combi fields early.
- `combi.setAllowOverride(true)`: Allows redefining a field.
- `combi.setNext(anotherCombi)`: Automatically starts another Combi after the current one finishes.

### Fields
#### Creating fields:
- `combi.field(name)`: Defines or gets a field.
- `combi.yesNoField(name)`: Defines a boolean field with `Combi.YES` and `Combi.NO` as options.

#### Field types:
This additional call is required for fields generated using `combi.field(name)`. So the full definition is, for example: `const myField = combi.field("myField").isOneOf("value A", "value B", "value C");`

- `fld.isOneOf(...)`: Single choice from predefined options.
- `fld.isSomeOf(...)`: Multiple selections from predefined options.

#### Constraints:
- `fld.mustBe(value)`: Field must be a specific value.
- `fld.cannotBe(value)`: Field cannot be a specific value.
- `fld.whenSetTo(x).field(f2).mustBe(y)`: Conditional constraint – if field fld's value is set to x, field f2's value must be set to y.
- `fld.whenSetTo(x).field(f2).cannotBe(y)`: Conditional constraint – if field fld's value is set to x, field f2's value cannot be set to y.

#### Persistence:
- `fld.record()`: Save field value to `bp.store` under the field’s name. The storage key is the field’s name.
-  To get the saved field: `bp.store.get(key)`

#### Event types:
- `combi.startEvent`: Emitted when evaluation begins.
- `combi.doneEvent`: Emitted when evaluation ends.
- `combi.anyEvent`: All events related to this combi.
- `combi.anyFieldSetEvent`: All events where a field is assigned a value.
- `fld.startEvent`: Emitted when field evaluation begins.
- `fld.setToEvent(value)`: Emitted when field is assigned a specific value.
- `fld.anySetEvent`: All `set` events for a field.
- `fld.doneEvent`: Emitted when field assignment completes.

## Example
```
// @provengo summon combi

const vehicle = Combi("vehicle");

const vehicleType = vehicle.field("type").isOneOf("car", "truck", "sports car");
const seatCount = vehicle.field("seat count").isOneOf([2,4,6]);
const isUnderWarranty = vehicle.yesNoField("under warranty");
const addons = vehicle.field("add ons").isSomeOf("turbo", "hybrid motor", "dark windows");

vehicleType.whenSetTo("sports car").field(seatCount).mustBe(2);
vehicleType.whenSetTo("truck").field(seatCount).cannotBe(6);

vehicle.doStart();
```
