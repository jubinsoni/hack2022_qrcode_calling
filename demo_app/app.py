from flask import Flask,request
import sqlite3
import json
from datetime import datetime, timedelta
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

def get_available_agent():
    agent_available = False
    url = "https://kpi.knowlarity.com/Basic/v1/account/agent"

    payload={}
    headers = {
    'x-api-key': '',
    'Authorization': ''
    }

    response = requests.request("GET", url, headers=headers, data=payload)
    output = json.loads(response.text)
    for op in output['objects']:
        if op['status'] == 'Available' and len(op['call_groups']) > 0 and op['call_groups'] != '-':
            agent_available = True
            break
    return agent_available



def place_c2c_call(number):

    url = "https://kpi.knowlarity.com/Basic/v1/account/call/makecall"
    
    payload = json.dumps({
      "k_number": "+919986735171",
      "agent_number": "+918770915486",
      "customer_number": str(number),
      "caller_id": ""
    })
    headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': '',
      'x-api-key': ''
    }
    
    response = requests.request("POST", url, headers=headers, data=payload)
    return json.loads(response.text)

def send_sms(number,context):
    #context = 'Thanks%20for%20choosing%20us%20our%20agent%20will%20call%20you%20back%20shortly.'
    context = 'Sorry!%20We%20missed%20your%20call%20but%20we%20have%20noted%20your%20number%20and%20will%20get%20back%20to%20you%20shortly.'
    url = "http://kservices.knowlarity.com/ksms/send?mobile_number={}&sms_type=t&message={}&sender_id=TATAMO".format(number,context)
    
    payload={}
    headers = {}
    
    response = requests.request("POST", url, headers=headers, data=payload)
    return response.text

def create_campaign(number, ivr_id):
    url = "https://kpi.knowlarity.com/Basic/v1/account/call/campaign"
    
    start_time = (datetime.now() + timedelta(minutes=1)).strftime('%Y-%m-%d %H:%M')
    stop_time = (datetime.now() + timedelta(minutes=30)).strftime('%Y-%m-%d %H:%M')
    payload = json.dumps({
      "ivr_id": ivr_id,
      "timezone": "Asia/Kolkata",
      "priority": "1",
      "order_throttling": "10",
      "retry_duration": "15",
      "start_time": str(start_time),
      "end_time": str(stop_time),
      "max_retry": "1",
      "call_scheduling": "[1, 1, 1, 1, 1, 1, 1]",
      "call_scheduling_start_time": "09:00",
      "call_scheduling_stop_time": "21:00",
      "k_number": "+919986735171",
      "additional_number": number,
      "is_transactional": "True"
    })

    headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-api-key': '',
      'Authorization': ''
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    return json.loads(response.text)

def create_cc_campaign(number):
    url = "https://kpi.knowlarity.com/Basic/v1/account/call/campaign"
    
    start_time = (datetime.now() + timedelta(minutes=1)).strftime('%Y-%m-%d %H:%M')
    stop_time = (datetime.now() + timedelta(minutes=30)).strftime('%Y-%m-%d %H:%M')
    ivr_id  = "1000083521"
    payload = json.dumps({
      "ivr_id": ivr_id,
      "timezone": "Asia/Kolkata",
      "priority": "1",
      "order_throttling": "10",
      "retry_duration": "15",
      "start_time": str(start_time),
      "end_time": str(stop_time),
      "max_retry": "1",
      "call_scheduling": "[1, 1, 1, 1, 1, 1, 1]",
      "call_scheduling_start_time": "09:00",
      "call_scheduling_stop_time": "21:00",
      "k_number": "+919986735171",
      "additional_number": number,
      "is_transactional": "False"
    })

    headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-api-key': '',
      'Authorization': ''
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    return json.loads(response.text)

def add_call_to_cc_campaign(order_id,number):
    url = "https://kpi.knowlarity.com/Basic/v1/account/call-center/add_call_to_order"

    payload={'order_id': order_id,
    'phone_numbers': number}
    files=[

    ]
    headers = {
    'x-api-key': '',
    'Authorization': '',
    'Cookie': 'SRUserId=1317449'
    }

    response = requests.request("PUT", url, headers=headers, data=payload, files=files)
    return json.loads(response.text)

@app.route('/')
def hello():
    return 'Hello, World!'

@app.get('/get_sound')
def get_sound():
    conn = get_db_connection()
    posts = conn.execute('SELECT * FROM posts').fetchall()
    conn.close()
    return posts

@app.route('/virtual_tour_guide', methods=['POST'])
def virtual_tour_guide():
    ivr_id = "1000083509"
    content_type = request.headers.get('Content-Type')
    print(content_type)
    if content_type == 'application/json':
        temp_data = request.get_json()
        lang = temp_data.get('language','english')
        number = temp_data.get('number','+919625829639')
        print(temp_data)
        resp = create_campaign(number , ivr_id)
        print(resp)
        return {'message':'OK'}
    elif 'multipart/form-data' in content_type:
        data = request.form
        lang = data['language']
        number = data['number']
        print(data)
        resp = create_campaign(number)
        print(resp)
        return {'message':'OK'}
    else:
        return {'message','error'}


@app.route('/advertisement', methods=['POST'])
def advertisement():
    flag = False
    content_type = request.headers.get('Content-Type')
    conn = get_db_connection()
    cur = conn.cursor()
    print(content_type)
    if content_type == 'application/json':
        temp_data = request.get_json()
        advertisement_id = temp_data.get('advertisement_id',11111)
        number = temp_data.get('number','+919625829639')
        if flag :
            cur.execute('select order_id from advertisement where advertisement_id = {};'.format(advertisement_id))
            row = cur.fetchone()
            if row:
                add_call_to_cc_campaign(row[0],number)
            else:
                print('not found')
                resp = create_cc_campaign(number)
                cur.execute("INSERT INTO advertisement (advertisement_id, order_id) VALUES (?, ?)",(advertisement_id, resp['order_id']))

            ret = get_available_agent()
            if not ret:
                resp_sms = send_sms(number,'')
        else:
            resp_sms = send_sms(number,'')
            resp = place_c2c_call(number)
        
        return {'message':'OK'}
    elif 'multipart/form-data' in content_type:
        data = request.form
        advertisement_id = data['advertisement_id']
        number = data['number']
        print(data)
        resp_sms = send_sms(number,'')
        resp = place_c2c_call(number)
        print(resp)
        return {'message':'OK'}
    else:
        return {'message','error'}


@app.route('/restaurant_order', methods=['POST'])
def restaurant_order():
    ivr_id = '1000083545'
    content_type = request.headers.get('Content-Type')
    print(content_type)
    if content_type == 'application/json':
        temp_data = request.get_json()
        item_list = temp_data.get('item_list','english')
        number = temp_data.get('number','+919625829639')
        resp = create_campaign(number, ivr_id)
        return {'message':resp['order_id']}
    elif 'multipart/form-data' in content_type:
        data = request.form
        item_list = data['language']
        number = data['number']
        print(data)
        resp = create_campaign(number, sound_id)
        return {'message':'OK'}
    else:
        return {'message','error'} 

