בס"ד  



Hello!   
The server is running on http://3.134.103.40/  
It might ask you to login, but the permissions are off, so you can ignore  
What the project is missing (just run out of time!) :   
It does not work with big pictures, I haven't fixed that yet.   
Missing validition checks. like if the date recieved is not in the future or if recoving date is before getting sick date, peope that went sick before they were born, etc.    
Also, the calls don't always return and never display if the act was succesfully operated or failed   
Oh, and pagination let you scroll to pages that don't exist   

Note:
All the details on the profile beside of the picture are a must, if you don't insert one of them it won't pass.  
Covid data is Not a must. You can left it blank or insert part of it - it is legal.  

for installing and running thr project - it's somewhat hard coded here.   
1: please change baseurl on dataFeed and welcome and config files to your updated IP/doamin.    
2: npm install   
3: set postgress on your machine, if you set it somewhere else, you'll have to update the connection settings (in config and database files)   
4: create database names covid
5: npm start


Home page - all profiles. login from base Url (http://3.134.103.40/) or just manually go to http://3.134.103.40/dataFeed.html   
![alt text](https://github.com/EdwardTulane1/covid-task/blob/main/public/screenShot_1.png?raw=true)

Statistics page - stats from Home page or http://3.134.103.40/statistics.html. Then enter the last X days you want to watch and apply    
![alt text](https://github.com/EdwardTulane1/covid-task/blob/main/public/screenShot_2.png?raw=true)

watch button will open all the data about the patient and let you edit or delete it    
![alt text](https://github.com/EdwardTulane1/covid-task/blob/main/public/screenShot_3.png?raw=true)

create button will let you add a patient
