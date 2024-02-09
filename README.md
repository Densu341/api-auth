# My Hotel Reservation

This API uses HTTP VERBS to communicate and HTTP [response codes] to indenticate status and errors. All responses come in standard JSON. All requests must include a content-type of application/json and the body must be valid JSON.

### Base URL: http://localhost/api/v1

## API Reference

### Sign Up

```http
  POST /signup
```

| Parameter  | Type     | Description                              |
| :--------- | :------- | :--------------------------------------- |
| `name`     | `string` | **Required**. Name of user to create     |
| `email`    | `string` | **Required**. Email of user to create    |
| `phone`    | `string` | **Required**. Phone of user to create    |
| `password` | `string` | **Required**. Password of user to create |

| Response  | Type     | Description                                                       |
| :-------- | :------- | :---------------------------------------------------------------- |
| `success` | `Object` | _status_ : 200, _message_: "You have signed up successfully"      |
| `error`   | `Object` | _status_ : 400, _message_: "Your record already exists with us!!" |

### Login

```http
  POST /login
```

| Parameter  | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `email`    | `string` | **Required**. Email of user    |
| `password` | `string` | **Required**. Password of user |

| Response  | Type     | Description                                                    |
| :-------- | :------- | :------------------------------------------------------------- |
| `success` | `Object` | _status_ : 200, _message_: _API-TOKEN_                         |
| `error`   | `Object` | _status_ : 400, _message_: "Your records do not exist with us" |
| `error`   | `Object` | _status_ : 400, _message_: "invalid crendetials"               |

### Users

#### Get all Users

```http
  GET /user
```

| Response  | Type     | Description                                                          |
| :-------- | :------- | :------------------------------------------------------------------- |
| `success` | `Object` | _status_ : 200, _message_: "Here's a list of Users", _data_ : _user_ |

#### Get a User

```http
  GET /user/id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |

| Response  | Type     | Description                                                      |
| :-------- | :------- | :--------------------------------------------------------------- |
| `success` | `Object` | _status_ : 200, _message_: "Here's your search", _data_ : _user_ |
| `error`   | `Object` | _status_ : 400, _message_: "User with this ID was not found"     |

#### Update a User

```http
  PUT /user/id
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of user to update |
| `key(s)`  | `object` | **Required**. property to update   |

| Response  | Type     | Description                                                  |
| :-------- | :------- | :----------------------------------------------------------- |
| `success` | `Object` | _status_ : 200, _message_: "Update successful!!"             |
| `error`   | `Object` | _status_ : 400, _message_: "User with this ID was not found" |

#### Delete a User

```http
  DELETE /user/id
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of user to delete |

| Response  | Type     | Description                                                  |
| :-------- | :------- | :----------------------------------------------------------- |
| `success` | `Object` | _status_ : 200, _message_: "User deleted"                    |
| `error`   | `Object` | _status_ : 400, _message_: "User with this ID was not found" |

### Hotels

#### Get all Hotels

```http
  GET /hotels/
```

| Response  | Type     | Description                                                            |
| :-------- | :------- | :--------------------------------------------------------------------- |
| `success` | `Object` | _status_ : 200, _message_: "Here's a list of Hotels", _data_ : _hotel_ |

#### Create a Hotel

```http
  POST /hotels/id
```

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `name`    | `string` | **Required**. Name of hotel to create    |
| `address` | `string` | **Required**. Address of hotel to create |
| `email`   | `string` | **Required**. Email of hotel to create   |
| `phone`   | `string` | **Required**. Phone of hotel to create   |

| Response  | Type     | Description                                                      |
| :-------- | :------- | :--------------------------------------------------------------- |
| `success` | `Object` | _status_ : 200, _message_: "Hotel created successfully..."       |
| `error`   | `Object` | _status_ : 400, _message_: "Hotel with this name already exists" |

#### Get a Hotel

```http
  GET /hotels/id
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of hotel to fetch |

| Response  | Type     | Description                                                      |
| :-------- | :------- | :--------------------------------------------------------------- |
| `success` | `Object` | _status_ : 200, _message_: "Search successful", _data_ : _hotel_ |
| `error`   | `Object` | _status_ : 400, _message_: "Hotel with this ID was not found"    |

#### Update a Hotel

```http
  PUT /hotels/id
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Required**. Id of hotel to update |
| `key(s)`  | `object` | **Required**. Property to update    |

| Response  | Type     | Description                                                         |
| :-------- | :------- | :------------------------------------------------------------------ |
| `success` | `Object` | _status_ : 200, _message_: "Update successful...", _data_ : _hotel_ |
| `error`   | `Object` | _status_ : 400, _message_: "Hotel with this ID was not found"       |

#### Delete a Hotel

```http
  DELETE /hotels/id
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Required**. Id of hotel to delete |

| Response  | Type     | Description                                                   |
| :-------- | :------- | :------------------------------------------------------------ |
| `success` | `Object` | _status_ : 200, _message_: "${hotel.name} deleted"            |
| `error`   | `Object` | _status_ : 400, _message_: "Hotel with this ID was not found" |

### Rooms

#### Get all Rooms

```http
  GET /rooms/
```

| Response  | Type     | Description                                                          |
| :-------- | :------- | :------------------------------------------------------------------- |
| `success` | `Object` | _status_ : 200, _message_: "Here's a list of Rooms", _data_ : _room_ |

#### Create a Room

```http
  POST /rooms/
```

| Parameter         | Type     | Description                                                                 |
| :---------------- | :------- | :-------------------------------------------------------------------------- |
| `room_name`       | `string` | **Required**. Room name                                                     |
| `total_occupants` | `string` | **Required**. Total standard occupants for room                             |
| `hotel_id`        | `string` | **Required**. Id of hotel the room to be created belongs to                 |
| `customer_id`     | `string` | **Required**. Id of customer in the room                                    |
| `price`           | `string` | **Required**. Price of room in the room                                     |
| `status`          | `string` | **Required**. Status of room (**options**: Available, Reserved or Occupied) |

| Response  | Type     | Description                                               |
| :-------- | :------- | :-------------------------------------------------------- |
| `success` | `Object` | _status_ : 200, _message_: "Room created successfully..." |

#### Get a Room

```http
  GET /rooms/id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of room to fetch |

| Response  | Type     | Description                                                      |
| :-------- | :------- | :--------------------------------------------------------------- |
| `success` | `Object` | _status_ : 200, _message_: "Here's your search", _data_ : _room_ |
| `error`   | `Object` | _status_ : 400, _message_: "Room with this ID was not found"     |

#### Update a Room

```http
  PUT /rooms/id
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of room to update |
| `key(s)`  | `object` | **Required**. Property to update   |

| Response  | Type     | Description                                                  |
| :-------- | :------- | :----------------------------------------------------------- |
| `success` | `Object` | _status_ : 200, _message_: "Update successful!!"             |
| `error`   | `Object` | _status_ : 400, _message_: "Room with this ID was not found" |

#### Delete a Room

```http
  DELETE /rooms/id
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of room to delete |

| Response  | Type     | Description                                                  |
| :-------- | :------- | :----------------------------------------------------------- |
| `success` | `Object` | _status_ : 200, _message_: "Room deleted"                    |
| `error`   | `Object` | _status_ : 400, _message_: "Room with this ID was not found" |

### Reservation

#### Get all Reservations

```http
  GET /reservations/
```

| Response  | Type     | Description                                                                         |
| :-------- | :------- | :---------------------------------------------------------------------------------- |
| `success` | `Object` | _status_ : 200, _message_: "Here's a list of Reservations"", _data_ : _reservation_ |

#### Make Reservations

```http
  POST /reservations/id
```

| Parameter     | Type     | Description                     |
| :------------ | :------- | :------------------------------ |
| `customer_id` | `string` | **Required**. Id of customer    |
| `hotel_id`    | `string` | **Required**. Id of the hotel   |
| `room_id`     | `string` | **Required**. Id of room        |
| `check_in`    | `string` | **Required**. Time of check-in  |
| `check_out`   | `string` | **Required**. Time of check-out |

| Response  | Type     | Description                                                                              |
| :-------- | :------- | :--------------------------------------------------------------------------------------- |
| `success` | `Object` | _status_ : 200, _message_: "Reservation created successfully...", _data_ : _reservation_ |

#### Get a Reservation

```http
  GET /reservations/id
```

| Response  | Type     | Description                                                             |
| :-------- | :------- | :---------------------------------------------------------------------- |
| `success` | `Object` | _status_ : 200, _message_: "Here's your search", _data_ : _reservation_ |
| `error`   | `Object` | _status_ : 400, _message_: "Reservation with this ID not found"         |

#### Update Reservation

```http
  PUT /reservations/id
```

| Parameter | Type     | Description                               |
| :-------- | :------- | :---------------------------------------- |
| `id`      | `string` | **Required**. Id of reservation to update |
| `key(s)`  | `object` | **Required**. Property to update          |

| Response  | Type     | Description                                                          |
| :-------- | :------- | :------------------------------------------------------------------- |
| `success` | `Object` | _status_ : 200, _message_: "Update successful!!"                     |
| `error`   | `Object` | _status_ : 400, _message_: "Reservation with this ID does not exist" |

#### Delete Reservations

```http
  DELETE /reservations/id
```

| Parameter | Type     | Description                               |
| :-------- | :------- | :---------------------------------------- |
| `id`      | `string` | **Required**. Id of reservation to delete |

| Response  | Type     | Description                                                     |
| :-------- | :------- | :-------------------------------------------------------------- |
| `success` | `Object` | _status_ : 200, _message_: "Reservation deleted"                |
| `error`   | `Object` | _status_ : 400, _message_: "Reservation with this ID not found" |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`APPLICATION_PORT=`

`DATABASE_NAME=reservation_api`

`DATABASE_HOST=`

`DATABASE_PORT=`

`DATABASE_USER=`

`DATABASE_PASSWORD=`

`DATABASE_URI=`

## Authors

- [@Densu341](https://github.com/Densu341)

## Demo

Work in progress

## Deployment

To deploy this project run

For development

```bash
  npm run dev
```

For production

```bash
  npm run start
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/Roemah-Djogja/Reservation_App_Backend.git
```

Go to the project directory

```bash
  cd My-Hotel-Reservation-API
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Tech Stack

**Server:** Node, Express, Mysql, Prisma

## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```
