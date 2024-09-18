## @teseractmcs/server-api

## Overview

The Server-API provides a robust set of tools and functionalities designed to enhance and extend the scripting API in Minecraft Bedrock. With this API, you can:

-   Create custom game mechanics with TypeScript features like decorators.
-   Develop advanced server-side logic.
-   Manage entities, players, and custom events efficiently.

Whether you're building a new game mode, creating complex in-game systems, or simply enhancing existing features, the Server-API has you covered.

## Usage

`npm install @teseractmcs/server-api`

or

`pnpm install @teseractmcs/server-api`

---

# **ServerAPI 1.0.0+1.14.0-beta**

This version is intended to be used with `@minecraft/server-api` 1.14.0-beta. This module will always depend on the beta versions of the module for **Minecraft stable releases**.

### What's in this module?

---

#### Plugins

-   This module provides access to the `TeseractPlugin` abstract class for handling entry points in your environment and providing easy access to an Object-Oriented Programming (OOP) environment.
-   You can register plugins using the `Teseract#registerPlugin` method in the `Teseract` class.

**Example:**

```ts
import { Teseract, TeseractPlugin, Logger } from "@teseractmcs/server-api";

class MyPlugin extends TeseractPlugin {
    private static LOGGER: Logger = Teseract.getLogger("example-id");

    public override onLoaded(): void {
        // Plugin loaded logic
        MyPlugin.LOGGER.info("MyPlugin loaded");
    }

    public override onEnabled(initializer: WorldInitializerBeforeEvent): void {
        // Plugin enabled logic
        MyPlugin.LOGGER.info("MyPlugin enabled");
    }
}

Teseract.registerPlugin(MyPlugin, "my-plugin");
```

---

#### Logger

-   A class intended for logging and debugging in the console. Use `Teseract#getLogger(string logger)` to get a logger with your desired ID. You can also directly instantiate a `Logger` using the `new` keyword.

-   Modifies 'globalThis', adding a global LOGGER object, that can be accessed anywhere.
    **Example:**

```ts
import { Teseract } from "teseractmcs/server-api";

const logger = Teseract.getLogger("MyLogger");

logger.info("This is an info message in MyLogger");
logger.warn("This is a warning in MyLogger");
logger.error("This is an error in MyLogger");

LOGGER.info("This is an info message in global system logger");
```

---

#### Vanilla Class Modifications

**Entity Class:**

-   `public getCardinalFacing(): string`: Returns the cardinal direction the entity is facing.
-   `public getCardinalFacing2d(): string`: Same as `getCardinalFacing` but for the 2D plane.
-   `public getBlockBelow(): Block`: Returns the block below the entity using raycasting.
-   `public isPlayer(): boolean`: Returns `true` or `false` depending on whether the entity is a player.

**Player Class:**

-   `public sendForm(form: CustomForm): void`: Sends a custom ServerAPI form to the player.
-   `public scaledKnockback(options?: ScaledKnockbackOptions): void`: Applies a constant knockback that is unaffected by Netherite armor. _Warning: This method is a workaround, and `options` is not yet functional._
-   `public clearVerticalImpulse(): void`: Clears the vertical (Y) velocity of the player. _Deprecated: Not recommended for future use._
-   `public clearVelocity(): void`: Overrides the non-functional `clearVelocity` method in `@minecraft/server.Player`. _Warning: This method is also a workaround._
-   `public applyImpulse(impulse: Vector3): void`: Overrides the non-functional `applyImpulse` method in `@minecraft/server.Player`. _Warning: May not behave as expected._
-   `public getInventory(): Inventory`: Direct access to the player's inventory, including mainhand, offhand, and armor slots.
-   `public getHealth(): number`: Retrieves the player's current health.
-   `public getMaxHealth(): number`: Retrieves the player's max health.
-   `public getHealthAttribute(): Attribute`: Direct access to the player's health component.

**Example:**

```ts
const player = someEntity;

if (player.isPlayer()) {
    player.sendForm(myCustomForm);
    player.scaledKnockback(1, 1, 1, 1);

    const health = player.getHealth();
    LOGGER.info(`Player health is ${health}`);
} else {
    player.applyImpulse({ x: 1, y: 1, z: 1 });
}
```

---

#### Custom Events

-   Exposes the `EventSignal` base class, which is used internally to emit custom events. It can be extended to create new custom events.

**Example:**

```ts
class MyCustomEventData {
    public timestamp: number;
    public constructor() {
        this.timestamp = Date.now();
    }
}

class MyCustomEventSignal extends EventSignal {
    public constructor() {
        super();
    }
}

const myEvent = new MyCustomEventSignal(someEntity);
const id = myEvent.subscribe((event) => {
    LOGGER.info("My Event was emitted on timestamp " + event.timestamp);
    myEvent.unsubscribe(id);
});

myEvent.triggerEvent(new MyCustomEventData());
```
- Built-in events:
  -   **`EntityResurrectBeforeEvent`**: Fires when an entity resurrects using a Totem of Undying.

        ```ts
        world.beforeEvents.entityResurrect.subscribe((event) => {
          LOGGER.info(event.entity.name + ' has resurrected');
        });
        ```


---

#### Timers

-   **`Runnable`** and **`StaticRunnable`**: Abstract classes for easily handling tick intervals in either static or public contexts.
-   **`Scheduler`**: Manages general interval executions and asynchronous tick sleeps.

**Example:**

```ts
import { Runnable } from "@teseractmcs/server-api";

class MyRunnable extends Runnable {
    private counter = 0;
    private logger = Teseract.getLogger("Timer");

    public override onRun(): void {
        this.counter++;
        this.logger.info(`Runnable tick: ${this.counter}`);
    }
}

new MyRunnable().runTimer(1); // Starts the timer with an interval of 1 tick

Scheduler.runTaskTimer(() => {
    LOGGER.info("Scheduler task timer triggered");
}, 1);
```

---

#### Command Decorator API

-   Enables custom command creation using decorators within a class and its methods. These decorators do **not** support static contexts.

-   **@CommandAlias**: Tags a class as a command and accepts one parameter: a string that defines the command name and its alias, separated by a `|` character.
-   **@Description**: Tags a class and defines the command description. Receives a string as a parameter. _In future versions, this parameter will support `RawMessage` for translatable descriptions._
-   **@Permission**: Tags a class or method and defines a permission callback that will be executed before the command or subcommand runs. It returns a boolean to indicate if the player has the required permission.
-   **@Default**: Tags a method as the default entry for a command when no subcommands are provided.
-   **@SubCommand**: Tags a method as a subcommand. Receives a string with the subcommand name and alias, separated by `|`.
-   **@Optional**: Tags a **parameter** to mark it as optional, so that it can be `undefined` without throwing an error.

**Example:**

```ts
import {
    Teseract,
    Logger,
    CommandAlias,
    Description,
    Permission,
    Default,
    SubCommand,
    Optional,
} from "@teseractmcs/server-api";

@CommandAlias("mycmd|mc")
@Description("This is my custom command")
@Permission((player: Player) => player.isAdmin())
class MyCommand {
    private LOGGER: Logger = Teseract.getLogger("my-command");

    @Default
    private executeDefault(player: Player): void {
        this.LOGGER.info(
            `${player.getName()} ran the default command`,
        );
    }

    @SubCommand("subcmd|sc")
    private executeSubCommand(player: Player, @Optional arg?: string): void {
        this.LOGGER.info(
            `${player.getName()} ran subcommand with arg: ${arg}`,
        );
    }
}
```

---

#### User Interface (UI) API

-   Enables custom form creation using decorators.

    -   **@FormTitle**: Tags a class and defines the form title. Accepts a `string`, `RawMessage`, or a callback function that returns a `string` or `RawMessage`.

    -   **@FormBody**: Tags a class and defines the form body. Accepts the same parameters as `@FormTitle`.

    -   **@Canceled**: Tags a method and defines the callback that runs when the form is canceled. Receives two parameters: the player who canceled the form and the reason for cancelation.

        -   **Action Forms**:

            -   **@ActionForm**: Tags a class as an action form.
            -   **@FormButton**: Tags a method as a form button. Accepts the button title as a `string` or `RawMessage`, or a callback function that returns either value. The callback receives the player as a parameter.
            -   **@OnActionFormInit**: Tags a class to define the callback that runs before sending the form. Receives two parameters: the form initializer and the player the form is sent to.

        -   **Message Forms**:
            -   **@MessageForm**: Tags a class as a message form.
            -   **@Button1** / **@Button2**: Tags a method and defines the action for button1 or button2. Receives the button text as a `string` or `RawMessage`, or a callback.

**Example:**

```ts
import {
    ActionForm,
    FormTitle,
    FormBody,
    FormButton,
    Canceled,
} from "@teseractmcs/server-api";

@ActionForm
@FormTitle("Select an Option")
@FormBody(function (player: Player) {
    return player.name + "'s form body";
})
class MyForm {
    @FormButton("Click Me")
    public buttonAction(player: Player): void {
        LOGGER.info(`${player.getName()} clicked the button!`);
    }

    @Canceled
    public onCancel(player: Player, reason: string): void {
        LOGGER.info(`${player.getName()} canceled the form`);
    }
}
```

---

#### Utilities

-   **`UnitConversor`**: For time unit conversions.

-   **`TimerUtil`**: Provides timer utilities like parsing dates and getting the max tick range. _This class will be deprecated in future versions._
-   **`Mixin`**: A function for multiple inheritance (ES2020 private fields `#` are not supported).
-   **`Identifier`**: Similar to Minecraft Java Edition’s `Identifier`. This class extends `String` but will return `'object'` for the `typeof` operator.

-   **`ForceOpenForm`**: Forces opening a form by looping until it can be sent.

-   **`Color`**: An enum for accessing Minecraft formatting codes (e.g., `§c`, `§l`, `§r`).

-   **Math Utilities**:
    -   `Clamp()`: Clamps numbers within a range.
    -   `Vec2d` and `Vec3d`: 2D and 3D vector implementations.

**Example:**

```ts
import { UnitConversor, Vec2d } from "@teseractmcs/server-api";

const unit = UnitConversor.secondsToTicks(10); // Converts 10 seconds to ticks

const vec2d = new Vec2d(10, 20);
const clampedValue = Clamp(vec2d.x, 0, 100); // Clamps the x coordinate between 0 and 100
```

---
