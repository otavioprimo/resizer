# Image Resizer for App Store

- Resize and remove alpha channel from images

## Install
`` npm install -g resizer-store ``

## How to use

On terminal, navigate to directory path and run
`` resizer-store ``

## Features
- Handle multiple images
- Resize images
- Remove alpha channel

## Supported sizes
- IOS
  - Icon 512 x 512
  - IPhone 6.5" 1242 x 2688
  - IPhone 5.5" 1125 x 2436
  - IPad 2048 x 2732

### Android not supported yet


## Next steps
- Functional Tests
- Support for android size
- Bug, when close the terminal in the first question, the second question shows up


| Dependencies |        |
|:------------:| :----: |
| sharp        | 0.23.0 |
| prompts      | 2.2.1  |
| colors       | 1.3.3  |