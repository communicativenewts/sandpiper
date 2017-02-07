#Shark Analytics
This analytics tool can be installed on any website and allows site owners to track visits to their page, as well as clicks on individual links. It uses Plotly to display site visits and link clicks visually, and a MongoDB database to store information.

##Team

Product Owner: Tony Hyde
Scrum Master: Erica Stephan
Development Team Members: Ian George, Jeff Bentler

##Table of Contents

###Usage
###Requirements
###Development
###Installing Dependencies
###Tasks
###Team
###Contributing

 -

##Usage

This app relies on a separate add-on script that can be implemented on a third party's website to track clicks on that site. This script is in the Buyify repository <a href="https://github.com/sharkanalytics/buyify/blob/master/README.md">here</a>. The filename for the tracking library that is central the shark analytics application is named wokeSharks.js

##Requirements

Node 0.10.x
Plot.ly
D3
Mongoose

##Development

##Installing Dependencies

From within the root directory:

sudo npm install -g bower
npm install
bower install
npm install express
npm install mongoose

##Roadmap

View the project roadmap here:
https://waffle.io/sharkanalytics/sharkanalytics

##Contributing

Features that remain to be implemented include:

- graphs by date of individual links, to see which days were most popular for clicking a given link
- allow hiding of stats and collapsing of dates individually by link instead of all at once
- build out additional endpoints on the Buyify demo site
