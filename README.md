# PostApp

This is a React Native application that allows users to view and interact with posts and comments fetched from a fake server hosted on [my-json-server.typicode.com](https://my-json-server.typicode.com/). The app uses Redux for state management, react-navigation for navigation between screens, and react-native-paper Material Design library.

## Features

- View a list of posts in the form of cards.
- Add, edit, and delete posts with title and body.
- View and add comments for each post.
- Edit and delete comments.

## Installation

Before proceeding with the installation, make sure you have Node.js, npm, React Native CLI, Android SDK, and JDK installed on your computer.

1. Clone this repository to your local machine:
```
git clone https://github.com/your_username/MyFakeServerApp.git
```
2. Navigate to the project directory:
```
cd MyFakeServerApp
```
3. Install the project dependencies:
```
npm install
```
4. Start the React Native development server:
```
npx react-native start
```
5. Run the app on your Android device or emulator:
```
npx react-native run-android
```
The app should now be installed and running on your Android device or emulator.

## Usage

Once the app is installed, you will see a list of posts on the home screen. Click on a post card to view its details and comments. You can also add, edit, and delete posts and comments.

To add a new post, click on the "Add Post" button on the home screen and fill in the title and body for the new post. Click on "Save" to add the post.

To edit a post, click on the "Edit" button on the post card. The post's title and body will become editable. Make the necessary changes and click on "Save" to update the post.

To delete a post, click on the "Delete" button on the post card. The post will be deleted from the list.

To add a comment to a post, scroll down to the comment section on the post details screen. Enter your comment in the input field and click on the "Add Comment" button to add it.

To edit a comment, click on the "Edit" button on the comment block. The comment text will become editable. Make the necessary changes and click on "Save" to update the comment.

To delete a comment, click on the "Delete" button on the comment block. The comment will be deleted.


