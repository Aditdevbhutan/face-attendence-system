# Face-attendence-system

Automatically mark attendance by recognizing faces using a live webcam.

## Core Features:

- Register faces with names (save images to a folder)

- Use a webcam to detect and recognize faces in real-time

- When a face is recognized, log the name and timestamp to a CSV or Excel file

## Built With:

- Python

- OpenCV (cv2 for camera and face recognition)

- face_recognition library for better accuracy (optional)

- Numpy or openpyxl for saving attendance records

## Installation Guide

1.Clone the project
```
git clone https://github.com/Aditdevbhutan/face-attendence-system.git
```
OR

Download the zip file from the <>Code dropdown 

2.Install the prerequisites
- Python and pip should already be installed
STEPS
2.1create a python environement 
```
cd ~/code/py/face-att/app
python -m venv .venv
source .venv/bin/activate
```
2.2install the libraries and packages
```
pip install face_recognition

# and 

pip install opencv-python
```

3.Running the app 
- Straight forward and easy

```
#in the terminal 
python main.py

```

