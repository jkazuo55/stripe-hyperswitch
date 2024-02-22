import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
  PaymentIntent,
} from '@stripe/stripe-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  token!: String;
  
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es',
  };

  stripeTest!: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private stripeService: StripeService
  ) {}

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['Angular v10', [Validators.required]],
      amount: [1000, [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }

  pay(): void {
    if (this.stripeTest.valid) {
      this.createPaymentIntent(this.stripeTest.get('amount')!.value)
        .pipe(
          switchMap((pi) =>
            this.stripeService.confirmCardPayment(pi.client_secret!, {
              payment_method: {
                card: this.card.element,
                billing_details: {
                  name: this.stripeTest.get('name')!.value,
                },
              },
            })
          )
        )
        .subscribe((result) => {
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
              // Show a success message to your customer
            }
          }
        });
    } else {
      console.log(this.stripeTest);
    }
  }

  // createPaymentIntent(amount: number): Observable<PaymentIntent> {
  //   return this.http.post<PaymentIntent>(
  //     `http://localhost:8080/payments`,
  //     { amount }
  //   );
  // }
  createPaymentIntent(amount: number): Observable<any> {

    // this.stripeService
    //   .createToken(this.card.getCard(), { name: this.paymentForm.value.name })
    //   .subscribe(result => {
    //     if (result.token) {
    //       console.log(result.token);
    //     } else if (result.error) {
    //       console.log(result.error.message);
    //     }
    //   });
    console.log('this.token',this.token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    .set('Content-Type', 'application/json')
    .set('api-key', 'test_admin')
    .set('Accept', 'application/json');
    return this.http.post<any>(
      `http://localhost:8080/payments`,
      {
        "amount": 6540,
        "currency": "USD",
        "confirm": true,
        "capture_method": "automatic",
        "capture_on": "2022-09-10T10:11:12Z",
        "amount_to_capture": 6540,
        "customer_id": "StripeCustomer",
        "email": "hola3@gmail.com",
        "name": "John Doe",
        "phone": "999999999",
        "phone_country_code": "+1",
        "description": "Its my first payment request",
        "authentication_type": "no_three_ds",
        "return_url": "https://google.com",
        "payment_method": "card",
        "payment_method_type": "credit",
        "payment_method_data": {
          "card": {
            "card_number": "4242424242424242",
            "card_exp_month": "10",
            "card_exp_year": "25",
            "card_holder_name": "joseph Doe",
            "card_cvc": "123"
          }
        },
        "billing": {
          "address": {
            "line1": "1467",
            "line2": "Harrison Street",
            "line3": "Harrison Street",
            "city": "San Fransico",
            "state": "California",
            "zip": "94122",
            "country": "US",
            "first_name": "joseph",
            "last_name": "Doe"
          },
          "phone": {
            "number": "8056594427",
            "country_code": "+91"
          }
        },
        "shipping": {
          "address": {
            "line1": "1467",
            "line2": "Harrison Street",
            "line3": "Harrison Street",
            "city": "San Fransico",
            "state": "California",
            "zip": "94122",
            "country": "US",
            "first_name": "joseph",
            "last_name": "Doe"
          },
          "phone": {
            "number": "8056594427",
            "country_code": "+91"
          }
        },
        "statement_descriptor_name": "joseph",
        "statement_descriptor_suffix": "JS",
        "metadata": {
          "udf1": "value1",
          "new_customer": "true",
          "login_date": "2019-09-10T10:11:12Z"
        },
        // "business_label": "food",
        // "business_country": "US"
      },
      {headers}
    );
  }

  createMerchant(){
    const headers = new HttpHeaders().set('Authorization', 'Bearer snd_OwMLyIUUGQOkbxJbxkecnmlnqWYEg1RLAeWqfFOWeCiqS7oxDwnaEwiZ8WhIcngY')
    .set('Content-Type', 'application/json')
    .set('api-key', 'test_admin')
    .set('Accept', 'application/json');
    this.http.post(`http://localhost:8080/accounts`,
    {
      "merchant_id": "merchant_65sd1515",
      "locker_id": "m0010",
      "merchant_name": "NewAge Retailer",
      "merchant_details": {
        "primary_contact_person": "John Test 22",
        "primary_email": "JohnTest@test.com",
        "primary_phone": "sunt laborum",
        "secondary_contact_person": "John Test222",
        "secondary_email": "JohnTest2@test.com",
        "secondary_phone": "cillum do dolor id",
        "website": "https://www.example.com",
        "about_business": "Online Retail with a wide selection of organic products for North America",
        "address": {
          "line1": "1467",
          "line2": "Harrison Street",
          "line3": "Harrison Street",
          "city": "San Fransico",
          "state": "California",
          "zip": "94122",
          "country": "US"
        }
      },
      "return_url": "https://google.com/success",
      "webhook_details": {
        "webhook_version": "1.0.1",
        "webhook_username": "ekart_retail",
        "webhook_password": "password_ekart@123",
        "payment_created_enabled": true,
        "payment_succeeded_enabled": true,
        "payment_failed_enabled": true
      },
      "routing_algorithm": {
        "type": "single",
        "data": "stripe"
      },
      "sub_merchants_enabled": false,
      "metadata": {
        "city": "NY",
        "unit": "245"
      },
      "primary_business_details": [
        {
          "country": "US",
          "business": "food"
        }
      ]
    },
    {headers}
    ).subscribe(value=>{
      console.log("value",value);
      
    })
  }

  register(){
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

    this.http.post(
      `http://localhost:8080/user/signup`,
      {
        email:"hola3@gmail.com",
        password:"holamundo",
        country:"US",
      },
      {headers}
    ).subscribe((value:any) => {
      this.token = value.token;
      console.log("signup",value);
    })
  }

  login () {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

    this.http.post(
      `http://localhost:8080/user/signin`,
      {
        email:"hola3@gmail.com",
        password:"holamundo",
        country:"US",
      },
      {headers}
    ).subscribe((value:any) => {
      this.token = value.token;
      console.log("signin",value);
    })
  }
}
