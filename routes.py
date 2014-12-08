from lsapp import app,db,User
from flask import render_template, request, redirect,url_for,session
from werkzeug import secure_filename
import json
from sqlalchemy import create_engine, MetaData, Table
from sqlalchemy.sql import select
import os
import unicodedata


UPLOAD_FOLDER = '/home/fuzzy/microblog/lsapp/static'
ALLOWED_EXTENSIONS = set(['avz','zip'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    if 'username' not in session:
        return render_template('index.html',title='Home')
    return render_template('userhome.html',title=session['username'],folders=userfolders(session['username']))

def userfolders(username):
    from os import listdir
    from os.path import isfile, join
    mypath = "/home/fuzzy/microblog/lsapp/static/"+username+"/"
    onlyfolders = [ f for f in listdir(mypath) if not isfile(join(mypath,f)) ]
    return onlyfolders

@app.route('/logincheck',methods=['post','get'])
def logincheck():
    if 'username' not in session:
        users=User.query.all()
        valid_user=False
        username=request.form['username']
        password=request.form['password']
        for user in users:
            if user.username==username and user.password==password:
                valid_user=True
                break
        if valid_user:
            session['username']=username
            return render_template('userhome.html',title=session['username'],folders=userfolders(session['username']))
        return render_template('index.html',title='Home')
    return render_template('userhome.html',title=session['username'],folders=userfolders(session['username']))
   
@app.route('/logout',methods=['get'])
def logout():
    session.pop('username',None)
    return render_template('index.html',title='Home')
    
@app.route('/enterDb',methods=['post'])
def enterDb():
	username=request.form['username']
	emailid=request.form['emailid']
	password=request.form['password']
	u=User(username=username,emailid=emailid,password=password)
	db.session.add(u)
	db.session.commit()
	users=User.query.all()
	return render_template('enterbd.html',title='enteryInDB',users=users)
'''

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS
           
@app.route('/upload_file', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename=file.filename
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return "upload sucessful"
'''
def jsondata(sqlite_path):
    '''engine = create_engine('sqlite:///%s' % sqlite_path, echo=False)
    metadata = MetaData(engine)
    moz_bookmarks = Table('zpicmodedict', metadata, autoload=True)
    s = select([moz_bookmarks])
    result = engine.connect().execute(s)
    jsonList=[]
    #keyList=['Z_PK', 'Z_ENT', 'Z_OPT', 'ZEXTRACOLUMN1', 'ZIS_ENABLED', 'ZIS_SENTENCE_BOX_ENABLED', 'ZSERIAL', 'ZVERSION', 'ZAUDIO_DATA', 'ZCATEGORY_OR_TEMPLATE', 'ZCOLOR', 'ZEXTRACOLUMN2', 'ZIDENTIFIER', 'ZPARENT_ID', 'ZPART_OF_SPEECH', 'ZPICTURE', 'ZTAG_NAME']
    keyList=['ZIS_ENABLED', 'ZIS_SENTENCE_BOX_ENABLED', 'ZSERIAL', 'ZVERSION', 'ZAUDIO_DATA', 'ZCATEGORY_OR_TEMPLATE', 'ZCOLOR',  'ZIDENTIFIER', 'ZPARENT_ID', 'ZPART_OF_SPEECH', 'ZPICTURE', 'ZTAG_NAME']
    for row in result:
        oneE={}
        for i,j in enumerate(keyList):
            if type(row[i])!=unicode:
                oneE[j]=str(row[i]) 
            else:
                oneE[j]=row[i] #unicodedata.normalize('NFKD', row[i]).encode('ascii','ignore')
        jsonList.append(oneE)
    jsonfile=json.dumps(jsonList)
    print jsonfile'''
    dbPath = '/home/fuzzy/microblog/lsapp/static/userone/one/one.sqlite'
    engine = create_engine('sqlite:///%s' % sqlite_path, echo=False)
    metadata = MetaData(engine)
    moz_bookmarks = Table('ZPICMODEDICT', metadata, autoload=True)
    from sqlalchemy.sql import select
    import unicodedata
    s = select([moz_bookmarks])
    result = engine.connect().execute(s)
    jsonList=[]
    keyList=['Z_PK', 'Z_ENT', 'Z_OPT', 'ZEXTRACOLUMN1', 'ZIS_ENABLED', 'ZIS_SENTENCE_BOX_ENABLED', 'ZSERIAL', 'ZVERSION', 'ZAUDIO_DATA', 'ZCATEGORY_OR_TEMPLATE', 'ZCOLOR', 'ZEXTRACOLUMN2', 'ZIDENTIFIER', 'ZPARENT_ID', 'ZPART_OF_SPEECH', 'ZPICTURE', 'ZTAG_NAME']
    for row in result:
        oneE={}
        for i,j in enumerate(keyList):
            oneE[j]=str(row[i]) if type(row[i])!=unicode else row[i]#unicodedata.normalize('NFKD', row[i]).encode('ascii','ignore')
        jsonList.append(oneE)
    import json
    jsondumps=json.dumps((jsonList))
    #print jsondumps
    return jsondumps

@app.route('/userV',methods=['POST'])
def userV():
    dbPath='/home/fuzzy/microblog/lsapp/static/'+request.form['submit']+'.sqlite'
    session['sqlite_path']=dbPath
    return render_template('userV.html',title=session['username'],folders=userfolders(session['username']))

@app.route('/jsonrequest',methods=['POST','GET'])
def jsonrequest():
    if 'sqlite_path' in session:
        js=jsondata(session['sqlite_path'])
        session.pop('sqlite_path',None)
        print len(js)
        return js
    return "what do you want?"
