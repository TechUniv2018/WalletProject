
#
# Digital Bank Wallet( BATUA )

## **Objective**

Our main aim is to develop and MVP digital bank wallet that supports the following basic features:

- User Registration
- Transaction History (Payment/Request History)
- Split Bill facility for a group
- In-app notifications

- [Use Cases](#use-cases)
    - [Case 1(Registration)](#use-case-1)
    - [Case 2(Login)](#use-case-2)
    - [Case 3(Change password)](#use-case-3)
    - [Case 4(Add a contact)](#use-case-4)
    - [Case 5(Pay funds)](#use-case-5)
    - [Case 6(Request funds)](#use-case-6)
    - [Case 7(Notification)](#use-case-7)
    - [Case 8(Transaction history)](#use-case-8)
    - [Case 9(Create group)](#use-case-9)
    - [Case 10(Split bill)](#use-case-10)
- [Use Case Diagram](#use-case-diagram)

## **Use Cases**


![alt text](https://image.ibb.co/d0WoYb/sc1.png "Description goes here")

### Use case 1
#### Register a new Customer
        

_Actors_ – Customer, Bank

_Description_ – This use case describes how to register a new customer using Aadhar card linking and using OTP sent to the linked mobile number with the user account.

Normal Workflow –

1. The customer will click on the Register icon on the Home Page.
2. User will fill his/her account number and other details.
3. User will add Addhar card number.
4. An OTP will be sent on the registered mobile number using the given account number.
5. The customer will enter the OTP in the App.
6. After verifying all the details, the customer  will be prompted to enter a Username and Password
7. Now the customer After confirming the password, a new account is created!

Alternate Workflow -

1a. If Account number is invalid

1. The App will display an error message.
2. The use case ends with a failure.

1b. If Aadhar number is not linked or invalid

1. The App will display an error message.
2. The use case ends with a failure.

1c. If OTP not delivered

1. Resend OTP

1d. If OTP is invalid

1. The App will display an error message.
2. The use case ends with a failure.

1e. If Username / Password is invalid

1. The App will display an error message.
2. The use case ends with a failure.

     
### Use case 2
#### Login to an existing account

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

### Use case 3
#### Forget/Change password.

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

### Use case 4
#### Add contact

_Actors_ _–_ Customer, Bank

Description – This case describes how to add a friend or a contact to user&#39;s list.

![Main image GIF](https://i.imgur.com/SUdaWWH.gif)

Normal Workflow –

1. User clicks on Add button to add a friend to pay/request funds
2. User will be prompt to the page where he can enter Account number/ phone number of a friend.
3. Notification sent to the added user.

![AddFriend2](https://i.imgur.com/0eswmvt.png)
![AddFriend3](https://i.imgur.com/BdyySf9.png)
![AddFriend4](https://i.imgur.com/usMShvE.png)

### Use case 5
#### Pay funds to another user.

_Actors –_ Customer, Bank

Description – This case describes how to pay money to a friend of the User&#39;s list.

* Normal Workflow –

1. User clicks on desired contact&#39;s name .
2. Window displaying the transfer between user and a friend gets open.
3. User will click on the pay button.
4. User will enter the amount to be paid.


![](https://media.giphy.com/media/l0HU1g95R2OjxP89q/giphy.gif)
	
  
* Alternate workflow
1. Payment may fail due to various reasons
2. User can click on retry button to retry 

![](https://s14.postimg.org/ptzrvg95d/flow.png)
#### Receive funds from another user
Description –This case describes how funds are received
* Normal Workflow:
1. User gets notification on contacts list
2. User can see the received card.
![](https://media.giphy.com/media/3o751QgRAtqq7cl4Kk/giphy.gif)

![](https://s14.postimg.org/3w3b1zesx/flow.png)
### Use case 6
#### Request funds from another user.
1.  Request funds from another user.
_Actors – Customer, Bank_

Description –This case describes how to request money from another user.

   Normal Workflow –

1. User clicks on desired contact&#39;s name .
2. Window displaying the transfer between user and a friend gets open.
3. User will click on the request button.
4. User will enter the amount to be requested.

![](https://s14.postimg.org/i3xl4c6kx/flow.png)



2. Another user requests funds from you

![](https://media.giphy.com/media/l49JRYrFWyHPBMKS4/giphy.gif)
* Alternate Workflow:
1. Payment could fail for various reasons
2. Click on retry button to retry  
![](https://media.giphy.com/media/l49JTE6EecC8CBPDa/giphy.gif)
![](https://s14.postimg.org/di1gvzsrl/flow.png)

### Use case 7
#### Get a notification for payment/request query

_Actors_ –Customer, Bank

Description – This case describes how user gets notification regarding payment/request.

   Normal Workflow –

1. User will be notified when a payment is done by a friend.
2. User will be notified when a request is sent by a friend.
3. For a request notification user can accept or deny the request.

### Use case 8
####  View transaction history
## Use Case – View Transaction history

_Actors_ – Customer, Bank

Description – This case describes how user can see the transaction history.

   Normal Workflow –

![Main image](https://i.imgur.com/fUzC6Mm.gif)


1. User can click on a transaction history button.
2. User will be prompt to the page where the transaction history will be provided with all the information regarding user&#39;s payment and request.


![img1](https://i.imgur.com/xRLQze9.png)
![img2](https://i.imgur.com/MaAZQlM.png)
![img3](https://i.imgur.com/zbndbou.png)
![img4](https://i.imgur.com/6T2QWDj.png)

		
## Use Case Diagram

![](https://preview.ibb.co/gUBerw/Screen_Shot_2018_01_22_at_1_54_11_PM.png)
