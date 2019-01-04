<a href="https://vnuhcm.edu.vn/"><h2 align="center">Vietnam National University Ho Chi Minh city</h2></a>
<h1 align="center">University of Information Technology</h1>
<p style="font-size: 26px" align="center">
  <a href="https://www.uit.edu.vn/"><img src="https://raw.githubusercontent.com/taigama/2048ReactNative/master/docs/logo_uit.png"></a>
</p>

![logo]  
  *version 1.0.1*  
Facebook React Native  
p/s: Sorry for the name cause misunderstanding. This project is about a Task Scheduler app, not a game.


### *Introduction*
*Mobile Programming - SE346.J11*  
Lecturer: M.A Huynh Tuan Anh
- A React Native project
- App help people scheduling theirs work, and check everyday. Easy to use, high performance.
- Currently we do not support iOS.  


*Members:*

 <img src="https://github.com/tatanoi.png" width="100" height="100"> | ![avatar2]
 --- | ---
 [NAM Nguyen Thanh](https://github.com/tatanoi) | [KHANG Dinh Hoang](https://github.com/taigama)


---
### *Using*
#### Project screen
<p float="left">
  <img src="https://raw.githubusercontent.com/taigama/2048ReactNative/master/docs/screen/pro_1.png" width="292" height="492">
  <img src="https://raw.githubusercontent.com/taigama/2048ReactNative/master/docs/screen/pro_3.png" width="292" height="492">
</p>


*Open after starting the app.*


No. | Component | Action
--- | --- | ---
1 | Search button | Open Search screen
2 | Board item | Open the board
3 | Board menu | Open the board's menu
4 | Add button | Add a new board
 |  | 
9 | Search bar in Search screen | Searching cards by input their names
10 | Card item result | Open the card

#### Workspace screen
<p float="left">
  <img src="https://raw.githubusercontent.com/taigama/2048ReactNative/master/docs/screen/work_1.png" width="292" height="492">
  <img src="https://raw.githubusercontent.com/taigama/2048ReactNative/master/docs/screen/work_2.png" width="292" height="492">
</p>


*Open after pressing on a board in Project screen.*


No. | Component | Action
--- | --- | ---
1 | Back button | Back to Project screen
2 | Add group button | Add a new group of cards
3 | Main menu button | Open main menu of this board
4 | Group menu button | Open the menu of the card group
5 | Card item | Open the task card inside the group. Hold to open the card's menu
6 | Add card button | Add a new task card
18 | Swipe left or right | Navigating between groups (if exist)
 |  | 
7 | Rename board | Rename the current board
8 | Bookmark/Unbookmark board | Pin/Unpin this board in the Project screen
9 | Archived groups | Open Archived groups screen
10 | Archived cards | Open Archived cards screen

#### Task detail screen
<p float="left">
  <img src="https://raw.githubusercontent.com/taigama/2048ReactNative/master/docs/screen/detail_1.png" width="292" height="492">
  <img src="https://raw.githubusercontent.com/taigama/2048ReactNative/master/docs/screen/detail_2.png" width="292" height="492">
</p>


*Open after pressing on a task card in Workspace screen, Search screen or Archived cards screen.*


No. | Component | Action
--- | --- | ---
1 | Back button | Back to the previous screen
2 | Card menu button | Open the menu of the current task card
3 | Title editbox | Change the current card's title
4 | Description editbox | Change the current card's description
5 | Label section | Open Edit labels screen
6 | Date & Time section | Change the current card's due time
7 | Completed checkbox | Is this task card completed?
8 | Checklist editbox | Edit content of the checklist
9 | Checklist checkbox | Is the subtask completed?
10 | Add new checklist editbox | To add a new subtask
 |  | 
14 | Back button | Back to Task detail screen
15 | Label checkbox | Choose this label or not (for the current task card)
16 | Edit label button | Edit the label
17 | Add label button | Add a new label

---
### *Technical*
- Framework: react-native 0.57.7
- Tested system: Android 5.0+ Emulators & Real devices.
- android/build.gradle:
```
buildscript {
    ext {
        buildToolsVersion = "27.0.3"
        minSdkVersion = 16
        compileSdkVersion = 27
        targetSdkVersion = 26
        supportLibVersion = "27.1.1"
    }
    repositories {
        google()
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.1.4'
    }
}
allprojects {
    repositories {
        mavenLocal()
        google()
        jcenter()
        maven {
            url "$rootDir/../node_modules/react-native/android"
        }
    }
}
task wrapper(type: Wrapper) {
    gradleVersion = '4.4'
    distributionUrl = distributionUrl.replace("bin", "all")
}
```
- *There are 2 packages need to be linked before run*

### *Download*
- Binary (Github server): [SmarTask_12.25.2.apk](https://github.com/taigama/2048ReactNative/releases/download/v1.0.1/SmarTask_12.25.2.apk)  
- Documentation (Github server): [AmateurX_SmartTask_SE346.J11.pdf](https://github.com/taigama/2048ReactNative/files/2708910/AmateurX_SmartTask_SE346.J11.pdf)


[logo]: https://raw.githubusercontent.com/taigama/2048ReactNative/master/app/_Resources/logo.png "App logo"
[avatar2]: https://github.com/taigama.png?size=100 "Taigama"
