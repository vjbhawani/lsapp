from lsapp import app,db


class User(db.Model):
	id=db.Column(db.Integer,primary_key=True)
	username=db.Column(db.String(40))
	emailid=db.Column(db.String(40))
	password=db.Column(db.String(40))
	
	def __init__(self,username,emailid,password):
		self.username=username
		self.emailid=emailid
		self.password=password
	def __repr__(self):
		return '<User %r>' % self.username
