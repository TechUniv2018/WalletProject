# Work Flow
## Use Case 1
### Register new customer

  1. The customer will click on the Register icon on the Home Page.
    1. If account number is invalid, use case ends with an error
    2. If Aadhar number is not linked or invalid, use case ends with an error
    3. If OTP is not delivered, user has an option to resend OTP
    4. If OTP is invalid, use case ends with failure
    5. If username/password is invalid, use case end with failure
    
  2. User will fill his/her account number and other details.
  3. User will add Aadhar card number.
  4. An OTP will be sent on the registered mobile number using the given account number.
  5. The customer will enter the OTP in the App.
  6. After verifying all the details, the customer  will be prompted to enter a Username and Password
  7. Now the customer After confirming the password, a new account is created

## Use case 2:
### Login to an existing account
1. On Login page the user enter the Username and Password.
2. After entering the right credentials, the user will be able to view his online account.
  1. If username is invalid
    1. The App will display an error message.
    2. The use case ends with a failure.
  2. If Password is invalid
    1. The App will display an error message.
    2. The use case ends with a failure.
