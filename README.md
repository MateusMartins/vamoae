# Web-Service Laravel 5
Project developed for the TSI course.

## Authors

* **Kevin Belletarde** - *(https://github.com/belletarde)
* **Laura** - *(#)
* **Mateus Martins** - *(https://github.com/MateusMartins)
* **Tonielton Mota** - *(https://github.com/tonimota)
* **Vinicius Oliveira** - *(https://github.com/vindite)

## Get in Started

## Running a Seeds DB
* php artisan migrate:refresh --seed

### How to use REST Resources

* Register New User:
    * Route => http://tsi.api.viniciusoliveira.org/public/api/register
    * Making a Json POST Request
    * {
    	"name":"Vinicius Oliveira",
    	"email":"vinicius_o.a@live.com",
    	"password":"123456"
    }


### Login with a registered User:
* Route => http://tsi.api.viniciusoliveira.org/public/api/login
    * Making a Json POST Request
    * {
    	"email":"vinicius_o.a@live.com",
    	"password":"123456"
    }

### Return a JSON object with all data events
* Route => http://tsi.api.viniciusoliveira.org/public/api/events?api_token=SECRET-USER-TOKEN

    * Resource Params {
    	Base URI: http://tsi.api.viniciusoliveira.org/public/api/
    	Resource: events
    	api_token: (User Logged in Token)
    }

* Register New Event:
    * Route => http://tsi.api.viniciusoliveira.org/public/api/events
    * Making a Json POST Request
    * {
        "title":"sample event",
        "body":"sample body event text",
        "user_id":"1",
        "api_token":"SECRET-USER-TOKEN"
    }
## License

This project is licensed under the MIT License.
