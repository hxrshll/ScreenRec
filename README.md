It looks like you're seeing merge conflict markers in the `README.md` file (e.g., `<<<<<<< HEAD` and `=======`). These markers appear when there are conflicting changes in the file that need to be resolved. They aren't meant to be part of the final file.

To fix this, you just need to remove the conflict markers and ensure that the content is consistent. Here’s the clean, fixed version of your `README.md` file:

---

# Screen Recorder with Electron

## Description
This project is a simple screen recording application built using Electron. It allows users to capture their screen and save the recorded video in popular formats. The application is lightweight and easy to use, offering basic screen recording features.

## Features
- Record the entire screen or select a specific window/region.
- Save recordings in multiple formats (e.g., MP4, WebM).
- Easy to use with a minimal user interface.

## Installation

### Prerequisites
Before installing, make sure you have the following tools installed:
- [Node.js](https://nodejs.org/) (v12 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
  
### Clone the Repository
```bash
git clone https://github.com/hxrshll/screen-recorder-electron.git
```

### Install Dependencies
Navigate to the project directory and install dependencies:
```bash
cd screen-recorder-electron
npm install
```

### Running the Application
To start the application:
```bash
npm start
```

## Usage

1. Open the app.
2. Choose whether to record your entire screen or select a specific window.
3. Click "Start Recording" to begin capturing.
4. Click "Stop Recording" when you're done, and the video will be saved to your desired location.

## Technologies Used
- **Electron**: Framework for building desktop applications with web technologies.
- **ffmpeg**: A powerful multimedia framework to record, convert, and stream audio and video.
- **Node.js**: JavaScript runtime for backend functionality.

## Contributing
Feel free to fork the repository and create pull requests with improvements. If you'd like to contribute, please:
- Open an issue for discussion before submitting your pull request.
- Ensure your code follows existing style guidelines.
- Write tests for any new features or bug fixes.

## License
This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

This should resolve the merge conflicts and make the `README.md` work properly. You can now copy and paste this version directly into your file.

Let me know if you need further assistance!