#
# Digital Bank Wallet

### **Objective**

Our main aim is to develop and MVP digital bank wallet that supports the following basic features:

- User Registration
- Transaction History (Payment/Request History)
- Split Bill facility for a group
- In-app notifications

### **Use Cases**

Our uses cases are listed below with &#39;1&#39; being highest priority use case.

1. Register a new customer using OTP.
2. Login to an already existing account.
3. Forget/Change password.
4. Add a friend
5. Pay funds to another user.
6. Request funds from another user.
7. Get a notification for payment/request query
8. View transaction history.
9. Create group for multiple members
10. Split bill among the group

![alt text](https://ibb.co/e2EWmw "Description goes here")

        Use Case – Register a new Customer

_Actors_ – Customer, Bank

_Description_ – This use case describes how to register a new customer using OTP sent to the linked mobile number with the user account.

Normal Workflow –

1. The customer will click on the Register icon on the Home Page.
2. User will fill his/her account number and other details.
3. An OTP will be sent on the registered mobile number using the given account number.
4. The customer will enter the OTP in the App.
5. After verifying all the details, the customer  will be prompted to enter a Username and Password
6. Now the customer After confirming the password, a new account is created!

Alternate Workflow -

1a. If Account number is invalid

1. The App will display an error message.
2. The use case ends with a failure.

1b. If OTP not delivered

1. Resend OTP

1c. If OTP is invalid

1. The App will display an error message.
2. The use case ends with a failure.

1c. If Username / Password is invalid

1. The App will display an error message.
2. The use case ends with a failure.

       Use Case – Login to an existing account

_Actors_ – Customer, Bank

_Description_ – This use case describes how to Login to an existing account

Normal Workflow –

1. On Login page the user enter the Username and Password.
2. After entering the right credentials, the user will be able to view his online account.

Alternate Workflow -

2a. If Username is invalid

1. The App will display an error message.
2. The use case ends with a failure.

2b. If Password is invalid

1. The App will display an error message.
2. The use case ends with a failure.

        Use Case – Forget/Change password.

_Actors_ – Customer, Bank

_Description_ – This use case describes how to change password (forgot password)

Normal Workflow –

1. Click on forget password
2. User will  prompt to new page to enter OTP.
3. After successful verification user can set the new password.

Alternate Workflow -

3a. If OTP is invalid

1. The App will display an error message.
2. The use case ends with a failure.

        Use Case – Add friend.

_Actors_ _–_ Customer, Bank

Description – This case describes how to add a friend or a contact to user&#39;s list.

Normal Workflow –

1. User clicks on Add button to add a friend to pay/request funds
2. User will be prompt to the page where he can enter Account number/ phone number of a friend.
3. Notification sent to the added user.

        Use Case – Pay funds to another user.

_Actors –_ Customer, Bank

Description – This case describes how to pay money to a friend of the User&#39;s list.

Normal Workflow –

1. User clicks on desired contact&#39;s name .
2. Window displaying the transfer between user and a friend gets open.
3. User will click on the pay button.
4. User will enter the amount to be paid.

        Use Case – Request funds from another user.

_Actors – Customer, Bank_

Description –This case describes how to request money from another user.

   Normal Workflow –

1. User clicks on desired contact&#39;s name .
2. Window displaying the transfer between user and a friend gets open.
3. User will click on the request button.
4. User will enter the amount to be requested.

        Use Case – Get a notification for payment/request query

_Actors_ –Customer, Bank

Description – This case describes how user gets notification regarding payment/request.

   Normal Workflow –

1. User will be notified when a payment is done by a friend.
2. User will be notified when a request is sent by a friend.
3. For a request notification user can accept or deny the request.

       Use Case – View Transaction history.

_Actors_ – Customer, Bank

Description – This case describes how user can see the transaction history.

   Normal Workflow –

1. User can click on a transaction history button.
2. User will be prompt to the page where the transaction history will be provided with all the information regarding user&#39;s payment and request.
