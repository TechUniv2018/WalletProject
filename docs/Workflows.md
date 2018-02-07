# Work Flow
## Use Case 1
### Register new customer

 [Go back to README.md](../README.md#use-case-1) 
 
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
 [Go back to README.md](../README.md#use-case-2) 
1. On Login page the user enter the Username and Password.
2. After entering the right credentials, the user will be able to view his online account.
	  1. If username is invalid
		    1. The App will display an error message.
		    2. The use case ends with a failure.
	  2. If Password is invalid
		    1. The App will display an error message.
		    2. The use case ends with a failure.

## Use case 3
### Forget/Change password.

 [Go back to README.md](../README.md#use-case-3) 
 
* Workflow-

  1. Click on forget password
  2. User will  prompt to new page to enter OTP.
  3. After successful verification user can set the new password.
    1. If OTP is invalid
      1. The App will display an error message.
      2. The use case ends with a failure.


### Use case 4
#### Add contact

 [Go back to README.md](../README.md#use-case-4) 
 
* Workflow - 

  1. User clicks on Add button to add a friend to pay/request funds
  2. User will be prompt to the page where he can enter Account number/ phone number of a friend.
  3. Notification sent to the added user.


### Use case 5
#### Pay funds to another user.

 [Go back to README.md](../README.md#use-case-5) 
 
* Normal Workflow –

  1. User clicks on desired contact&#39;s name .
  2. Window displaying the transfer between user and a friend gets open.
  3. User will click on the pay button.
  4. User will enter the amount to be paid.

* Alternate workflow

  1. Payment may fail due to various reasons
  2. User can click on retry button to retry 


#### Receive funds from another user
* Workflow:

  1. User gets notification on contacts list
  2. User can see the received card.
    
    
## Use case 6
### Request funds from another user.
**1.  Request funds from another user.**
 
 [Go back to README.md](../README.md#use-case-6) 
  
* Workflow –

  1. User clicks on desired contact&#39;s name .
  2. Window displaying the transfer between user and a friend gets open.
  3. User will click on the request button.
  4. User will enter the amount to be requested.

**2. Another user requests funds from you**
* Normal Workflow:
  1. You receive request from another user
  2. You accept or reject the request
* Alternate Workflow:
  1. Payment could fail for various reasons
  2. Click on retry button to retry  
  
## Use case 7
### Get a notification for payment/request query

 [Go back to README.md](../README.md#use-case-7) 
 
* Workflow –

1. User will be notified when a payment is done by a friend.
2. User will be notified when a request is sent by a friend.
3. For a request notification user can accept or deny the request.

## Use case 8
###  View transaction history

 [Go back to README.md](../README.md#use-case-8) 
 
* Workflow –
   1. User can click on a transaction history button.
  2. User will be prompt to the page where the transaction history will be provided with all the information regarding user&#39;s payment and request.
