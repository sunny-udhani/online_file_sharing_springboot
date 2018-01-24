# dropbox_spring
A web application imitating features of dropbox with Java, SpringBoot and MySQL.
> Individual academic project for Graduate software engineering course 273 - Enterprise Distributed Systems.

## Goal

* The goal is to build a distributed enterprise web application which enables the user not only to upload , star/unstar or delete files/folders but also share files/folders to other users, create groups, add/edit/delete members and view their own activity timeline.

* We were tasked with this project requirement so that we can learn and develop enterprise applications using latest technology trends like springboot. 

## System Design

> Applications uses a simple Client-Server architecture where there are as many as 13 React components, 17 API’s  to support different functionalities.

### Technology stack

![tech-stack](readme-src/tech-stack.jpg)

<table>
<thead>
<tr>
<th>Area</th>
<th>Technology</th>
</tr>
</thead>
<tbody>
	<tr>
		<td>Front-End</td>
		<td>React, Redux, React Router, Bootstrap, HTML5, CSS3, Javascript ( ES6 )</td>
	</tr>
	<tr>
		<td>Back-End</td>
		<td>Java, Springboot, Springdata, Hibernate</td>
	</tr>
	<tr>
		<td>API Testing</td>
		<td>JUnit, Postman</td>
	</tr>
	<tr>
		<td>Database</td>
		<td>MySQL</td>
	</tr>
	<tr>
		<td>Performance Testing</td>
		<td>JMeter</td>
	</tr>
</tbody>
</table>
<br/>


### Steps to run Springboot application:

* Create schema called dropbox
* import as maven project
* install all dependencies
* run the DropBoxApplication class

### Steps to run React side:

* run <code>npm install</code>
* run <code>npm start</code>
