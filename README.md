
## Project Helium: a personal web shell

A personal web shell based on Node.js and Mongodb, with guestbook and simple features for article management.

## Shell & Guestbook Mode

![Shell mode](https://raw.github.com/snowmantw/Helium/master/document/introduction/Shell.png)

## Article Reader & Comments Mode

![Reader mode](https://raw.github.com/snowmantw/Helium/master/document/introduction/Reader.png)

## How to Use

[Demo site at Heroku](http://freezing-light-7961.herokuapp.com/)

The command line after prompt character is separated to 3 parts:

    > | /<Command> | <Argument1> ;; <Argument2> ;; ... [Submit]

User should type command first, `Tab` to next section and input arguments separated by `;;`, ** then `Tab` again to the hidden submit button **, 
and press `Enter` to submit the command.

Command `/help` will all available commands.

    > | /help      |                                   [Submit]

Guestbook mode just don't type any command. Instead of, put `username` at the command section:

    > | Greg Weng  | Hello ! Write something here !    [Submit]


## Installation

Mongodb and Node.js are required.

One command line for Ubuntu:

    sudo apt-get install nodejs mongodb-server

Then into the directory:

    cd Helium && npm install

Remember to modify the `DBURL` and other environment settings in `run.js`:

    DBURL = "<your mongob url>"
    // ...

Run it:
    
    node ./run.js

---

## License 

Project Helium: a personal web shell (C) 2012 Greg Weng, snowmantw@gmail.com

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.
