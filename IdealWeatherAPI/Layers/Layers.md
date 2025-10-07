# Layers

## Purpose

The **Layers** folder is organizes a **layered** architecture.

### Presentation

The presentation layer presents the API to the outside world: this contains all logic for such code, which may include items such as:

- REST API Endpoints
- GraphQL graphs
- Websocket endpoints.
- Error responses.
- etc.

### Application

The application layer is responsible for all things business-logic that are not related to interactions with the user directly, and presents the combination of logic surrounding data transformation, processing, and retrieval.

- Services organize logical services that the presentation layer may access and use.
- Repositories organize data access systems used by, but separate from, these services.

### Domain

The domain organizes models that are standard to the project and used in many places, but does not include any business logic surrounding these models. Usage of these models and the manipulation of source data into these models is the responsibility of the application layer.

## Internal Organization

Interally, these layers use a **verical slice** pattern. Each structure is separated by feature rather than a more strict, grouped, organizational structure. Often it is the pattern to group all interfaces together, group all services together, group all DTOs together, etc. In vertical slices, each set of items is grouped by feature. For example, beneath repositories if the **Forecasting** feature. The forecasting feature exposes an interface for the forecasting feature directly, and this is all. One slice of this forecasting feature is the NationalWeatherService, which contains all models, utilities, and logic for interacting with the national weather service to implement the forecasting interface.

### Uncertainties

- Should the interfaces be in the individual slices or grouped at the repository layer and service layers?
