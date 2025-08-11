import face_recognition #recongnize the faces and compare to the faces in the database
import cv2 # opencv input from the webcam and process and give it to face_recongnition 
import numpy as np
import csv
import os
import glob
from datetime import datetime

# imput form the webcam (form opencv)
video_capture = cv2.VideoCapture(0)


# load and encode the faces

adit_image = face_recognition.load_image_file("faces/adit.jpg")
adit_encoding = face_recognition.face_encodings(adit_image)[0]

known_face_encoding = [
    adit_encoding
]

known_faces_names = [
    "adit"
]

students = known_faces_names.copy()

#variables for the faces
face_locations = []
face_encodings = []
face_names = []
s = True

# to get the exact dates and times
now = datetime.now()
current_date = now.strftime("%Y-%m-%d")

# Creating of csv file
f = open(current_date+'.csv','w+', newline= '') # using open method (make file the curret date.csv, opening with write + mthod)
lnwriter = csv.writer(f) # write data in csv file

# infinate loop
while True:
    _,frame = video_capture.read() # taking the imput for webcam and using read method by extracting the video data
    small_frame = cv2.resize(frame,(0,0),fx=0.25,fy=0.25) # not intrestead in the first value only signal but econd value , decreasing the size of the input form the webcam (using the resize function form opencv)
    rgb_small_frame = small_frame[:,:,::-1] # converting it to rgb as face_recogonization package use rgb cv2 takes the iput bgr format(BGR, or blue-green-red, is a color format that represents pixel color data in the order blue, green, and then red)
    
    # use the face recongization to recognize the faces
    if s: # if true
        face_locations = face_recognition.face_locations(rgb_small_frame) # this detect if there is a face or not 
        face_encodings = face_recognition.face_encodings(rgb_small_frame,face_locations) # this variables store the face data in the coming frame
        face_names = [] # empty list

        for face_encoding in face_encodings:
            matches = face_recognition.compare_faces(known_face_encoding,face_encoding) # using mathmetical model to compare faces and the parameters are know_face_encoding (the above list of faces encoded), face_ecoding(the face data coming form the webcamm)
            name = ""
            face_distance = face_recognition.face_distance(known_face_encoding,face_encoding)
            best_match_index = np.argmin(face_distance) # to  get the best probility of the know faces
            if matches[best_match_index]: # if it exist the face mathces as known faces
                name = known_faces_names[best_match_index]# will have the name  of the face(stored in the db)

            face_names.append(name)# append the name
            if name in known_faces_names: # is the name is in the know_face_name variable 
                if name in students: # if the name is present in the studdents (duplicate of known_face_name)
                    students.remove(name)# no duplicates will be created
                    print(students)# print the studnets names
                    current_time = now.strftime("%H-%M-%S") # the currents time hour , minute and second
                    lnwriter.writerow([name,current_time]) # writerow method to enter the tuple and the time of the student

    cv2.imshow("attendence system",frame) # shows the output user (video you want to display)
    if cv2.waitKey(1) & 0xFF == ord('q'): #create the exit condition press q to exit
        break

video_capture.release()
cv2.destroyAllWindows()
f.close()

