# Virtual Machine Assembler (VMA)

![Example picture](https://raw.githubusercontent.com/AlTrAugsburg/virtual-machine-Assembler/master/assets/example.png)

A virtual machine to learn the programming language Assembler. Written with [Electron](https://electronjs.org "Electron homepage") and [Bulma](https://bulma.io). Still in work. 

[Download the latest release here!](https://github.com/AlTrAugsburg/virtual-machine-Assembler/releases)

## What can you do on Version 1.0.0?

* Read .lasm files
* Save code as .lasm file
* Save log
* Execute code
* Clear register

## What is new in Version 1.0.1?

* Added SR which stores the flag of the register R0
* If there should be a negative number loaded in R0, instead R0 gets flagged and is set to 0
* Same procedure with overflow
* Bug (see Issue #1) was fixed

## What's coming next?

* There will be modes for the machine. One will support numbers from -127 to 127, the other will support numbers from 0 to 255
* Maybe a new mode for the code area

**Author: Albert Traut**
