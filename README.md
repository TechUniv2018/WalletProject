
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
- [Block Diagram](#block-diagram)
- [ER Diagram](#er-diagram)

## **Use Cases**

### Use case 1
#### Register a new Customer
        

_Actors_ – Customer, Bank

_Description_ – This use case describes how to register a new customer using Aadhar card linking and using OTP sent to the linked mobile number with the user account.

* Workflow –

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

![alt text](https://image.ibb.co/d0WoYb/sc1.png)
     
### Use case 2
#### Login to an existing account

_Actors_ – Customer, Bank

_Description_ – This use case describes how to Login to an existing account

Workflow-

1. On Login page the user enter the Username and Password.
2. After entering the right credentials, the user will be able to view his online account.
  1. If username is invalid
    1. The App will display an error message.
    2. The use case ends with a failure.
  2. If Password is invalid
    1. The App will display an error message.
    2. The use case ends with a failure.

### Use case 3
#### Forget/Change password.

_Actors_ – Customer, Bank

_Description_ – This use case describes how to change password (forgot password)

* Workflow-

  1. Click on forget password
  2. User will  prompt to new page to enter OTP.
  3. After successful verification user can set the new password.
    1. If OTP is invalid
      1. The App will display an error message.
      2. The use case ends with a failure.

### Use case 4
#### Add contact

_Actors_ _–_ Customer, Bank

Description – This case describes how to add a friend or a contact to user&#39;s list.

* Workflow - 

  1. User clicks on Add button to add a friend to pay/request funds
  2. User will be prompt to the page where he can enter Account number/ phone number of a friend.
  3. Notification sent to the added user.


![Main image GIF](https://i.imgur.com/SUdaWWH.gif)

![AddFriend2](https://i.imgur.com/DVtNqTl.png)



### Use case 5
#### Pay funds to another user.

_Actors –_ Customer, Bank

Description – This case describes how to pay money to a friend of the User&#39;s list.

* Normal Workflow –

  1. User clicks on desired contact&#39;s name .
  2. Window displaying the transfer between user and a friend gets open.
  3. User will click on the pay button.
  4. User will enter the amount to be paid.

* Alternate workflow

  1. Payment may fail due to various reasons
  2. User can click on retry button to retry 

![](https://media.giphy.com/media/l0HU1g95R2OjxP89q/giphy.gif)

![](https://s14.postimg.org/ptzrvg95d/flow.png)

#### Receive funds from another user
Description –This case describes how funds are received
* Workflow:

  1. User gets notification on contacts list
  2. User can see the received card.
    
![](https://media.giphy.com/media/3o751QgRAtqq7cl4Kk/giphy.gif)

![](https://s14.postimg.org/3w3b1zesx/flow.png)
### Use case 6
#### Request funds from another user.
**1.  Request funds from another user.**
  _Actors – Customer, Bank_

  Description –This case describes how to request money from another user.

* Normal Workflow –

  1. User clicks on desired contact&#39;s name .
  2. Window displaying the transfer between user and a friend gets open.
  3. User will click on the request button.
  4. User will enter the amount to be requested.

![](https://s14.postimg.org/i3xl4c6kx/flow.png)



**2. Another user requests funds from you**
* Normal Workflow:
  1. You receive request from another user
  2. You accept or reject the request
* Alternate Workflow:
  1. Payment could fail for various reasons
  2. Click on retry button to retry  
  
   
![](https://media.giphy.com/media/l49JRYrFWyHPBMKS4/giphy.gif)

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

* Workflow –
   1. User can click on a transaction history button.
  2. User will be prompt to the page where the transaction history will be provided with all the information regarding user&#39;s payment and request.


![Main image](https://i.imgur.com/fUzC6Mm.gif)

![img1](https://i.imgur.com/RXuLweM.png)
    
## Use Case Diagram

![](https://i.imgur.com/CAX7Ud8.png)

## Block Diagram

![](https://raw.githubusercontent.com/abishekaditya/batua/master/block_diagram.png?token=AThrfP0hbE_zmhM1ljL9HJ-zIKtp15gXks5acLyVwA%3D%3D)

## ER Diagram

![](https://image.ibb.co/d5cepR/scc.png)

## Database Schema

![](/DBSchema.png)
