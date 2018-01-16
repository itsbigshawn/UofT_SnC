# -*- coding: utf-8 -*-
"""
Created on Mon Sep 11 15:53:33 2017

@author: r_com
"""

from flask import Flask, render_template, request, jsonify, json
import os
from datetime import datetime
import numpy as np
import pandas as pd

app = Flask(__name__,
            static_folder=os.path.join(os.path.dirname(os.path.abspath(__file__)), "static"),
                                      static_url_path="/static")
#to open the file chosen by user
from tkinter import filedialog, Tk
root = Tk()
root.withdraw()
file_path = filedialog.askopenfilename(parent=root)
data = pd.read_csv(file_path, header=0)


def names():
    first_names = data["First Name"]
    last_names = data["Last Name"]
    names = first_names+" "+last_names
    unq_names = names.unique()
    names = unq_names.tolist()
    names = sorted(names)
    ret_list = []
    for i in range(len(names)):
        ret_list.append({'key':'name'+str(i),  'text':names[i], 'value':names[i]})

    return ret_list

def exercises():
    exercise_names = data['Exercise Name'].unique().tolist()
    exercise_names = sorted(exercise_names)
    ret_list = []
#    print(exercise_names)
    for i in range(len(exercise_names)):
        ret_list.append({'key':'exercise'+str(i),  'text':exercise_names[i], 'value':exercise_names[i]})
#        ret_list.append({'text':names[i], 'value':names[i]})
#    print ret_list
    return ret_list
    

def work(person_name, exercise_name):
    first_names = data["First Name"]
    last_names = data["Last Name"]
    names = first_names+" "+last_names
    isname = (names == person_name)
    
    length = data.shape[0]
    results = [r for r in list(data) if 'Result' in r]
    result_values = data[results]
    num_reps = 10-1
#    total_data = pd.DataFrame(columns=['Name', 'Date', 'Exercise', 'Values'])
#    total_data = pd.DataFrame(columns=[ 'Date', 'Values'])
#    temp_data = pd.DataFrame()
    temp_data2 = []
    for i in range(length-1):
            if isname.iloc[i]:
                if data['Exercise Name'].iloc[i] == exercise_name:
                    temp = []
                    for j in range(num_reps,-1,-1):
                        if not pd.isnull(result_values.iloc[i][j]):
                            
                            temp.append(result_values.iloc[i][j])
#                        print temp
#                    print temp
                    temp2 = temp[::-1]
                    temp_d = {}
                    temp_d['date'] = data['Completed Date'].iloc[i]
#                    temp_d['date'] = datetime.strptime(data['Completed Date'].iloc[i])
                    for k in range(len(temp)):
                        
                        temp_d['rep'+str(k)] = temp2[k]

                    temp_data2.append(temp_d)
#    for i in range(len(temp_data2)):
#        temp_data2[i]['key']= 'instance'+str(i)
        
    return temp_data2

def send_data():
    data2 = [{'text': 'Man', 'value': 100}, {'text': 'Woman', 'value': 500}] 
    return data2
#https://github.com/pusher-community/react-realtime-chat
#https://github.com/pyankoff/flask-react/blob/master/run_dev.py
@app.route('/')
def hello_world():
#    print(request.data, sys.stdout) 
    return render_template('index.html')

@app.route('/data2', methods=['GET', 'POST'])
def test_data():
    if request.method == 'GET':
        res = send_data()
#        print jsonify(res)
        return jsonify(res)
    else:
        pass
    
@app.route('/data/<athlete>/<exercise>', methods=['GET', 'POST'])
def real_data(athlete, exercise):
    if request.method == 'GET':
#        name =  request.args.get('athlete')
#        exercise = request.args.get('workout')
        print ("REQUEST" ,str(athlete), str(exercise))
        #call string to change unicode character
        res = work(str(athlete), str(exercise))
        print ("RESPONSE: ",res)
        return jsonify(res)
    else:
        pass
    
@app.route('/namesList', methods=['GET', 'POST'])
def send_names():
    if request.method == 'GET':
        res = names()
#        print jsonify(res)
        return jsonify(res)
    else:
        pass
    
@app.route('/exerciseList', methods=['GET', 'POST'])
def send_exercises():
    if request.method == 'GET':
        res = exercises()
#        print jsonify(res)
        return jsonify(res)
    else:
        pass


    
#@app.route('/app.bundle.js')
#def send_js():
#    return send_static_file('app.bundle.js')

if __name__ == '__main__':
    app.run(debug=True)