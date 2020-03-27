from flask import Flask, render_template, redirect, jsonify, request
from pymongo import MongoClient


app = Flask(__name__)

client = MongoClient("mongodb+srv://shreesh:gottacatchemall@projectcorontine-ohoqg.mongodb.net/test?retryWrites=true&w=majority")
db = client['Corontine']
users = db['players']

@app.route('/', methods=['GET', 'POST'])
def homePage():
    if request.method == 'GET':
        return render_template('index.html')

    if request.method == 'POST':
        data = {
            'name' : request.form['userName'],
            'score' : 0
        }
        id = users.insert_one(data)
        nameString = request.form['userName']
        NameString = nameString.replace(" ","+")
        redirect_url = '/questionaire?name='+NameString
        return redirect(redirect_url)

# @app.route('/play', methods=['GET','POST'])
# def beginPlay():
#     if request.method == 'POST':
#         data = {
#             'name' : request.form['userName'],
#             'score' : 0
#         }
#         id = users.insert_one(data)
#         nameString = request.form['userName']
#         NameString = nameString.replace(" ","+")
#         redirect_url = '/questionaire?name='+NameString
#         return redirect(redirect_url)



@app.route('/questionaire', methods=['GET', 'POST'])
def quizPage():
    if request.method == 'GET':
        someValue = "something"
        return render_template('question.html', someValue=someValue)
    if request.method == 'POST':
        something = 'something'
        return something


@app.route('/result', methods=['GET', 'POST'])
def resultPage():
    if request.method == 'GET':
        sortedAchievers = users.find().sort([("score", -1)])
        count = 0
        achievers = []
        for x in sortedAchievers:
            if(count>10):
                break
            achievers.append(x)
            count+=1
        Score = request.args['score']
        Name = request.args['name']
        return render_template('result.html',Score=Score,Name=Name,achievers=achievers)

@app.route('/result/process', methods=['POST','GET'])
def resultProcess():
    if request.method == 'POST':
        user_name = request.form['Name']
        sCore = int(request.form['Score']) 
        users.update_one({ 'name' : user_name } , { '$set' : { 'name' : user_name , 'score' : sCore } })
        some = 'something'
        return some


if __name__ == '__main__':
    app.run(debug=True)