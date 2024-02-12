### Base URL: http://localhost/api/v1/auth

## API Reference

### Login

```http
  POST /
```

| Parameter  | Type     | Description                             |
| :--------- | :------- | :-------------------------------------- |
| `email`    | `string` | **Required**. Email of user to login    |
| `password` | `string` | **Required**. Password of user to login |

| Response  | Type     | Description                                |
| :-------- | :------- | :----------------------------------------- |
| `success` | `Object` | _status_ : 200, _message_: "Login Success" |
| `error`   | `Object` | _status_ : 400, _message_: "Fail"          |

### Register

```http
  POST /register
```

| Parameter          | Type     | Description                              |
| :----------------- | :------- | :--------------------------------------- |
| `fullname`         | `string` | **Required**. Name of user to create     |
| `email`            | `string` | **Required**. Email of user to create    |
| `password`         | `string` | **Required**. Password of user to create |
| `password_confirm` | `string` | **Required**. confirm of user to create  |

| Response  | Type     | Description                                                       |
| :-------- | :------- | :---------------------------------------------------------------- |
| `success` | `Object` | _status_ : 200, _message_: "You have register successfully"       |
| `error`   | `Object` | _status_ : 400, _message_: "Your record already exists with us!!" |
