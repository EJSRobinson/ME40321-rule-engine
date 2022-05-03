# ME40321 - Rule Engine

University of Bath 2022 - Aerospace Engineering
Bath Rocket Team
Final Year Project - ME40321
BRT Fin Designer

Elliot Robinson - Team Leader
CN: 12858

## BRT Fin Designer

- BRT fin designer was created to allow those within amateur rocketry to quickly and easilly design rocket fins. The software was built around automatic design and therfore does not rely on the user's knowledge of underlying engineering theory. The software can however be used purely as an analysis tool if the user wishes.
- No formal educational background is required to use the tool
- The tool is free to use and always will be
- The software was written with collaboration in mind. If you're interested in collobrating, please email me at elliotjs.robinson@gmail.com. Having a background in Aerospace Engineering would be helpful but is by no means required.

## Rule Engine

This module provides the is the core of BRT fin designer application. This is where all design decisions are made based on user constraints as well as providing interfacing between the application's logic engine and user interface.

## Overall Useage

- Please note - this module is of 1 of 4, designed to be in run in conjuction with all 3 others.
- Docker container to be released in September 2022
- Electron instance to be released September 2022
- To try the software prior to the offical release date, please run module individually and following module specific install instructions. Note that if you're running the software prior to release you're likely to encouter bugs. These aim to be fixed prior to release in september 2022. I apologise in advance in they cause you problems.

## Module Specific Install

- Note: Running this module will require local availability on port 2700
- Ensure 'ME40321 - Logic Engine' is installed and running
- Clone this repository
- Ensure NodeJS ES6 or later is installed on your local machine
- In the cloned repository root path run 'node api-server.js'
